# THIS FILE SHOULD LIVE IN /backups

import json;
import os
import glob
newest = max(glob.iglob('database/*.txt'), key=os.path.getctime);
data=open(newest).read();
k=json.loads(data);
list_of_resume_ids = k.keys();

z=open("../httpdocs/resume_ids",'wb');
z.writelines("\n".join(list_of_resume_ids));
z.close();

# Get newest db backup file
