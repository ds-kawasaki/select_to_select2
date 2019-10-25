## Select To Select2 Plugin
This is a repository of Redmine plugin: Select To Select2 Plugin.

## Features

Replace all select tag to select2 in all Redmine's Pages.

![2017-10-09 21 50 40](https://user-images.githubusercontent.com/12267699/31339056-998c52f0-ad3c-11e7-88ea-bc7acf8cdf96.png)

## Installation

1. ```$git clone https://github.com/tainewoo/select_to_select2.git```

2. Copy to ```redmine/plugins/select_to_select2```

3. ```bundle exec rake redmine:plugins:migrate NAME=select_to_select2 RAILS_ENV=production```

4. restart apache2
