---
kind: product-profile
owner_skill: tkm:generate-llms-txt
updated: 2026-09-08
---

# Product Profile

**Product name**: Athena
**URL**: https://athena.sun-asterisk.vn
**Department**: Sun* DevOps Platform (R&D Unit)
**Owner**: DevOps Platform Team
**Support contact**: Slack #con_sun-devsecops-platform-support-all — https://sun-asterisk.enterprise.slack.com/archives/C083TUY14AG
**Summary**: Athena is Sun*'s self-hosted code coverage service: teams upload coverage and test reports from CI or a local machine, then see per repository, pull request, commit, file and line what their tests actually cover.
**Surfaces**: web, cli
**Audience default**: user

## Provenance

Athena runs the open-source Codecov stack at calver **25.6.2** (upstream release 2025-06-03),
operated by Sun* as a self-hosted deployment. Two upstream repositories make up the product:

- Frontend — fork of [`codecov/gazebo`](https://github.com/codecov/gazebo), licensed
  FSL-1.1-Apache-2.0 (`LICENSE.md`).
- Backend — [`codecov/umbrella`](https://github.com/codecov/umbrella) at tag
  `self-hosted-25.6.2`, licensed FSL-1.1-Apache-2.0.

Users do not install or operate the service themselves; Sun* R&D runs it. What a user installs is
`codecov-cli`, to upload reports to https://athena.sun-asterisk.vn.
