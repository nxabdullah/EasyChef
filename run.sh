#run backend server in the background
python3 backend/easychef/manage.py runserver &

echo "Backend server running..."

#start frontend server
npm --prefix frontend start

