""" Exchanges Namespace's API """

from flask_restx import Namespace, Resource, fields
from flask import request
from flask_jwt_extended import jwt_required
from models import Exchange, Account
from datetime import datetime
from flask import current_app as app

exchange_api=Namespace('exchanges')

exchange_model = exchange_api.model(
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


@exchange_api.route("/")
class ExchangesResource(Resource):

    @exchange_api.marshal_list_with(exchange_model)
    def get(self):
        """ Get all exchanges """
        exchanges = Exchange.query.all()
        return exchanges

    @exchange_api.marshal_with(exchange_model)
    @exchange_api.expect(exchange_model)
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


@exchange_api.route("/<int:id>")
class ExchangeResource(Resource):
    @exchange_api.marshal_with(exchange_model)
    def get(self, id):
        """ Get an exchange by id """
        exchange = Exchange.query.get_or_404(id)
        return exchange

    @exchange_api.marshal_with(exchange_model)
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
            if data.get("status") == "????????????":
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

    @exchange_api.marshal_with(exchange_model)
    #@jwt_required()
    def delete(self, id):
        """ Delete an exchange """
        exchange_to_delete = Exchange.query.get_or_404(id)
        exchange_to_delete.delete()
        return exchange_to_delete


@exchange_api.route("/<int:uid>/demand")
class UserDemand(Resource):

    @exchange_api.marshal_with(exchange_model)
    def get(self, uid):
        """ Get a user's demand by his uid """
        demand = Exchange.query.filter(Exchange.receiver_uid==uid).all()
        return demand


@exchange_api.route("/<int:uid>/supply")
class UserSupply(Resource):

    @exchange_api.marshal_with(exchange_model)
    def get(self, uid):
        """ Get a user's supply by his uid """
        supply = Exchange.query.filter(Exchange.provider_uid==uid).all()
        return supply
