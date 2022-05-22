""" Main program """

from create_app import create_app
app = create_app()

""" Local Testing """
if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        @app.route("/") 
        def get():
            return "Hello Flask"
        import route_linebot
        import route      
        app.run()        # Activate server
