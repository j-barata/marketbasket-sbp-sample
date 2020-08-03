[![CircleCI](https://circleci.com/gh/j-barata/marketbasket-sbp-sample.svg?style=shield)](https://circleci.com/gh/j-barata/marketbasket-sbp-sample)
[![Heroku](https://heroku-badge.herokuapp.com/?app=marketbasket-sbp-sample)](https://marketbasket-sbp-sample.herokuapp.com)
![GitHub](https://img.shields.io/github/license/j-barata/marketbasket-sbp-sample.svg)

## Market Basket SBP Sample project

A dummy project to test the [SBP](https://github.com/hank-cp/sbp) library.

### Content

This repository contains five Maven modules:
* `market.basket.sbp.sample.api` which provides a set of interfaces used by the application. Each plugin provides its own implementation of these interfaces.
* `market.basket.sbp.sample.application` which provides the main application.
* `market.basket.sbp.sample.plugins.pears` which provides a plugin embedding a set of specific features: controller, image resource.
* `market.basket.sbp.sample.plugins.potatoes` which provides a plugin embedding set of specific features: controller, image resource.
* `market.basket.sbp.sample.plugins.tomatoes` which provides a plugin embedding set of specific features: controller, image resource.

### How to

#### Build and Run

* `git clone https://github.com/j-barata/marketbasket-sbp-sample.git`
* `cd marketbasket-sbp-sample`
* `mvn clean package`
* `java -jar java -jar application/target/market.basket.sbp.sample.application-1.0.0-SNAPSHOT-standalone.jar`

The application should now be available from `http://localhost:8090`

#### Use

##### Through the Restful services

* List the plugins ids: GET `http://localhost:8090/plugins/id`
* List the plugins names: GET `http://localhost:8090/plugins/list`
* List the plugins resources: GET `http://localhost:8090/plugins/resources`
* List the plugins content: GET `http://localhost:8090/plugins/basket`
* Get the application specific resource: GET `http://localhost:8090/logo.png`
* Call the `pears` specific controller: GET `http://localhost:8090/pears/name`
* Get the `pears` specific resource: GET `http://localhost:8090/pears/pear.png`
* Call the `potatoes` specific controller: GET `http://localhost:8090/potatoes/name`
* Get the `potatoes` specific resource: GET `http://localhost:8090/potatoes/potato.png`
* Call the `tomatoes` specific controller: GET `http://localhost:8090/tomatoes/name`
* Get the `tomatoes` specific resource: GET `http://localhost:8090/tomatoes/tomato.png`

##### Through the React application

* The web UI is available at [http://localhost:8090](http://localhost:8090).

### Useful links

* The SBP repository: https://github.com/hank-cp/sbp
* The Plugin Framework for Spring: https://github.com/pf4j/pf4j-spring
* A PoC of the SBP library: https://github.com/fabioformosa/sbp-pluggable-project
