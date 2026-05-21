import http.server
import os

os.chdir('/Users/benitosantana/Desktop/web')

handler = http.server.SimpleHTTPRequestHandler
server = http.server.HTTPServer(('', 8080), handler)
print('Servidor en http://localhost:8080')
server.serve_forever()
