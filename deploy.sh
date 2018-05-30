#!/bin/bash
tar -cvzf build.tar build
scp build.tar csnyder@10.11.15.11:~
rm build.tar
ssh csnyder@10.11.15.11 "tar -xvzf build.tar && rm -rf build.tar && mv build gibraltar && sudo rm -rf /var/www/labs/gibraltar && sudo mv gibraltar /var/www/labs"
