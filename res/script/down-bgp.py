import requests
import sys
import os

url = sys.argv[1]
no = sys.argv[2]
name = 'res/bgp/bgp' + no
ok = False

def req(flag = 3):
	res = requests.get(url)
	if res.ok:
		with open(name + '.jpg', 'wb') as img:
			img.write(res.content)
	elif flag > 0:
		req(flag - 1)

open(name, 'wb').close()
req()
os.unlink(name)
