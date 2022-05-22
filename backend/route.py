from flask import current_app as app
from flask_restx import Namespace, Resource, fields, Api
from flask import request
from models import Exchange, Account
from datetime import datetime
from flask import request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

api=Api(app, doc='/docs')


exchange_model = api.model(
    "exchanges",
    {
        "id": fields.Integer(),
        "receiver_uid": fields.Integer(),
        "provider_uid": fields.Integer(),
        "item": fields.String(),
        "region": fields.String(),
        "status": fields.String(),
        "notes": fields.String(),
        "date_added": fields.DateTime(default=datetime.now)
    }
)


account_model = api.model(
    "accounts",
    {
        "uid": fields.Integer(),
        "line_id": fields.String(),
        "line_user_id": fields.String(),
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
    }
)

""" Exchange API """

@api.route("/exchanges/")
class ExchangesResource(Resource):

    @api.marshal_list_with(exchange_model)
    def get(self):
        """ Get all exchanges """
        exchanges = Exchange.query.all()
        return exchanges

    @api.marshal_with(exchange_model)
    @api.expect(exchange_model)
    #@jwt_required()
    def post(self):
        """ Create a new exchange """
        """
            @jwt_required() means JWT authenitcation is needed
            Request header needs to include the following:
                "Authorization": "Bearer <access_token>"
        """
        data = request.get_json()

        new_exchange = Exchange(
            receiver_uid = data.get("receiver_uid"),
            provider_uid = data.get("provider_uid"),
            item = data.get("item"),
            region = data.get("region"),
            status = data.get("status"),
            notes =  data.get("notes"),
        )

        new_exchange.save()
        return new_exchange


@api.route("/exchanges/<int:id>")
class ExchangeResource(Resource):
    @api.marshal_with(exchange_model)
    def get(self, id):
        """ Get an exchange by id """
        exchange = Exchange.query.get_or_404(id)
        return exchange

    @api.marshal_with(exchange_model)
    #@jwt_required()
    def put(self, id):
        """ Update an exchange by id """
        exchange_to_update = Exchange.query.get_or_404(id)
        data = request.get_json()
        if "provider_uid" in data:
            exchange_to_update.update_provider(data.get("provider_uid"))
        if "status" in data:
            exchange_to_update.update_status(data.get("status"))

            # if the updated status is "matched", inform both users with line messages.
            if data.get("status") == "媒合成功":
                provider = Account.query.filter(Account.uid==exchange_to_update.provider_uid).first()
                receiver = Account.query.filter(Account.uid==exchange_to_update.receiver_uid).first()

                # messages to be sent.
                provider_message = "Matched! Please contact the receiver.\n" + "Username: {}\n".format(receiver.username) + "LINE ID: {}\n".format(receiver.line_id) + "Email: {}".format(receiver.email)
                receiver_message = "Matched! Please contact the provider.\n" + "Username: {}\n".format(provider.username) + "LINE ID: {}\n".format(provider.line_id) + "Email: {}".format(provider.email)

                with app.app_context():
                    import route_linebot
                    from linebot.models import TextSendMessage
                    route_linebot.line_bot_api.push_message(provider.line_user_id, TextSendMessage(text=provider_message))
                    #route_linebot.line_bot_api.push_message(receiver.line_user_id, TextSendMessage(text=receiver_message))

        return exchange_to_update

    @api.marshal_with(exchange_model)
    #@jwt_required()
    def delete(self, id):
        """ Delete an exchange """
        exchange_to_delete = Exchange.query.get_or_404(id)
        exchange_to_delete.delete()
        return exchange_to_delete


@api.route("/exchanges/<int:uid>/demand")
class UserDemand(Resource):

    @api.marshal_with(exchange_model)
    def get(self, uid):
        """ Get a user's demand by his uid """
        demand = Exchange.query.filter(Exchange.receiver_uid==uid).all()
        return demand


@api.route("/exchanges/<int:uid>/supply")
class UserSupply(Resource):

    @api.marshal_with(exchange_model)
    def get(self, uid):
        """ Get a user's supply by his uid """
        supply = Exchange.query.filter(Exchange.provider_uid==uid).all()
        return supply


""" Account API """

@api.route("/accounts/signup")
class SignUp(Resource):
    # @account_api.marshal_list_with(account_model)
    @api.expect(account_model)
    def post(self):
        """ Create a new account """
        data = request.get_json()

        # Use email as an identifier
        signup_email = data.get("email")
        db_account = Account.query.filter(Account.email==signup_email).first()

        if db_account is not None:
            return jsonify({"message": f"Account already exists"})

        """ TODO: get line_user_id """
        """ line_user_id will be handled in the webhook of line api """
        signup_line_user_id = "12345"

        new_account = Account(
            line_id = data.get("line_id"),
            line_user_id = signup_line_user_id,
            username =  data.get("username"),
            email = data.get("email"),
            password =  generate_password_hash(data.get("password"))
        )

        new_account.save()
        # return new_account
        return make_response(jsonify({"message":"Account created successfully"}),201)


@api.route("/accounts/login")
class Login(Resource):
    @api.expect(account_model)
    def post(self):
        """ Login an account """
        data = request.get_json()
        login_email = data.get("email")
        login_password = data.get("password")

        db_account = Account.query.filter(Account.email == login_email).first()

        if db_account is not None and check_password_hash(db_account.password, login_password):
            access_token = create_access_token(identity=db_account.email)
            refresh_token = create_refresh_token(identity=db_account.email)

            return jsonify(
                {
                    "uid": db_account.uid,
                    "username": db_account.username,
                    "line_id": db_account.line_id,
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }
            )
        elif db_account is not None:
            return jsonify({"message": "Wrong password"})
        else:
            return jsonify({"message": "Account not found"})


@api.route("/accounts/")
class ExchangesResource(Resource):

    @api.marshal_list_with(account_model)
    def get(self):
        """ Get all accounts """
        accounts = Account.query.all()
        return accounts


@api.route("/accounts/<int:uid>")
class ExchangeResource(Resource):
    @api.marshal_with(account_model)
    def get(self, uid):
        """ Get account information by uid """
        account = Account.query.get_or_404(uid)
        return account

    @api.marshal_with(account_model)
    def delete(self, uid):
        """ Delete an account """
        account_to_delete = Account.query.get_or_404(uid)
        account_to_delete.delete()
        return account_to_delete


@api.route('/accounts/refresh')
class RefreshResource(Resource):
    #@jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token":new_access_token}),200)
