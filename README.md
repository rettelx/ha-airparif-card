[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Homeassistant Airparif Card</h3>

  <p align="center">
    Air pollution card based on the <a href="https://github.com/rettelx/ha-airparif">Airparif</a> integration
    <br />
    <br />
    <a href="https://github.com/rettelx/ha-airparif-card/issues">Report Bug</a>
    ·
    <a href="https://github.com/rettelx/ha-airparif-card/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
<a href="#usage">Usage</a>
      <ul>
        <li><a href="#configuration">Configuration</a></li>
        <li><a href="#example">Example</a></li>
      </ul>
</li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About the Project

This project provides a card that displays data from the [rettelx/ha-airparif](https://github.com/rettelx/ha-airparif)
project.

![Card example](https://github.com/rettelx/ha-airparif-card/blob/main/images/image.jpg?raw=true)

<!-- GETTING STARTED -->

## Getting Started

To get up and running follow these simple steps.

### Prerequisites

This card is intended to work with entities from [this integration](https://github.com/rettelx/ha-airparif).

### Installation

1. Copy the `airparif-card.js` file into your `www` folder.

2. Add the "Airparif" card directly from the Homeassistant dashboard.

## Usage

### Configuration

| Name   | Type   | Requirement  | Description                                       | Default |
| ------ | ------ | ------------ | ------------------------------------------------- | ------- |
| type   | string | **Required** | `custom:airparif-card`                            |         |
| entity | string | **Required** | Home Assistant entity ID for the Airparif sensor. | `none`  |

### Example

```yaml
type: custom:airparif-card
entity: sensor.airparif_75101
```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/rettelx/ha-airparif-card/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

This repository is based on:

- The [custom_cards/boilerplate_card](https://github.com/custom-cards/boilerplate-card) project.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/rettelx/ha-airparif-card.svg?style=for-the-badge
[contributors-url]: https://github.com/rettelx/ha-airparif-card/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/rettelx/ha-airparif-card.svg?style=for-the-badge
[forks-url]: https://github.com/rettelx/ha-airparif-card/network/members
[stars-shield]: https://img.shields.io/github/stars/rettelx/ha-airparif-card.svg?style=for-the-badge
[stars-url]: https://github.com/rettelx/ha-airparif-card/stargazers
[issues-shield]: https://img.shields.io/github/issues/rettelx/ha-airparif-card.svg?style=for-the-badge
[issues-url]: https://github.com/rettelx/ha-airparif/-cardissues
[license-shield]: https://img.shields.io/github/license/rettelx/ha-airparif-card.svg?style=for-the-badge
[license-url]: https://github.com/rettelx/ha-airparif-card/blob/master/LICENSE.txt
