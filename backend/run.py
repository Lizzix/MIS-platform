""" Main program """

from create_app import create_app
app = create_app()

""" Local Testing """
if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        import route_linebot
        app.run()        # Activate server