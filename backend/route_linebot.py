import os
import sys
import json
from flask import current_app as app
from flask import request, abort
from dotenv import load_dotenv
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage
from models import Account

# load secrets of a line channel.
load_dotenv()
channel_secret = os.getenv("LINE_CHANNEL_SECRET", default=None)
channel_access_token = os.getenv("LINE_CHANNEL_ACCESS_TOKEN", default=None)
if channel_secret is None or channel_access_token is None:
    print("please put channel secret and channel access token in the .env file.")
    sys.exit(1)

# create a line messaging api instance.
line_bot_api = LineBotApi(channel_access_token)
handler = WebhookHandler(channel_secret)

# define webhook to handle line users' requests.
@app.route("/webhook", methods=["POST"])
def webhook_handler():

    # get request body as text.
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # extract user id from the request.
    # try to map user id to username and store into db.
    body_json = json.loads(body)
    for event in body_json["events"]:
        user_id = event["source"]["userId"]
        db_accounts = Account.query.all()
        for db_account in db_accounts:
            if db_account.username == line_bot_api.get_profile(user_id).display_name:
                db_account.update_line_user_id(user_id)

    # verify that post request is from line platform with "X-Line-Signature" in http header,
    # and handle the request.
    signature = request.headers["X-Line-Signature"]
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        print("invalid signature, abort the request.")
        abort(400)

    # Return OK if handled successfully.
    return "OK"

# when the event is an instance of MessageEvent, and event.message is an instance of TextMessage.
@handler.add(MessageEvent, message=TextMessage)
def handle_text_message(event):

    # simply echo the text.
    line_bot_api.reply_message(event.reply_token, TextSendMessage(text=event.message.text))
