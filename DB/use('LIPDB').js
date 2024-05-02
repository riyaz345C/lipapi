use('LIPDB')
db.users.updateOne({"name":"riyaz"},{$push:{"projects" : {"msg":0}}})