
Cambiamos la direccion de la API
const response = await axios.get(`http://ip172-18-0-8-coa46hi91nsg008eii4g-3000.direct.labs.play-with-docker.com/api/${gifNumber}`);

docker build -t test .

docker run -d -p 3000:3000 --name containertest test


para AWS

sudo apt-get update
sudo apt-get upgrade
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
sudo npm install pm2 -g
pm2 ls
sudo pm2 startup
sudo apt-get install git
npm install
pm2 start app.js
pm2 save