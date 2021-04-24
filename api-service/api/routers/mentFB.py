import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore



cred = credentials.Certificate("hlexg-63f51-firebase-adminsdk-sowzl-31be6ac6ff.json")
firebase_admin.initialize_app(cred)

project_id = 'hlexg-63f51'
project_num = '1052628677159'
web_api_key= 'AIzaSyCRIfYEedX-KFBjCSUvr3BsEvZoIK3OQdQ'
service_account_email = 'bruckerjosephh@gmail.com'

credentials = firebase_admin.credentials.Certificate("/Users/joebrucker/Desktop/hlexg-63f51-firebase-adminsdk-sowzl-31be6ac6ff.json")



db = firebase_admin.firestore.client()


doc_ref = db.collection(u'mentions')


#query
mentions_ref = db.collection(u'mentions')
for doc in mentions_ref.stream():
    print(u'{} => {}'.format(doc.id, doc.to_dict()))


#push
for data_item in tok:
    doc_ref = store.collection(u'docs').document()
    batch.set(doc_ref, data_item)

batch.commit()