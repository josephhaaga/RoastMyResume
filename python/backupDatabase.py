# THIS FILE SHOULD LIVE IN backups/database/

import requests;
import json;
import time;

r = requests.get('https://rmr.firebaseio.com/resume.json?print=pretty');
r.json();
with open(time.time()+'.json', 'w') as outfile:
    json.dump(data, outfile);

