# 🚀 Lin-Autoupdater

Lin-Autoupdater is a tool for automatic package updates on Linux systems. It supports various package managers and ensures your system stays up-to-date effortlessly.

---

## 📦 Installation

To install Lin-Autoupdater, ensure you have Node.js and npm installed. Then, run:

```bash
npm install -g lin-Autoupdater
```
---
## 🌟 Features

- **Automatic Updates:** Keeps your Linux packages updated seamlessly.
- **Multi-Platform:** Works across various Linux distributions.
- **Customizable:** Manage package ignore lists.
---
## 📋 Usage

### Enable Autoupdater Service

To enable the autoupdater service:

```bash
lin-Autoupdater enable
```

### Disable Autoupdater Service

To disable the autoupdater service:

```bash
lin-Autoupdater disable
```

### Update Packages

To manually update all packages:

```bash
lin-Autoupdater update
```

### Ignore Packages  

To ignore packages, add the name of the package in the list of the [./src/config/ignore-list.json](https//github.com/douxxu/lin-autoupdater/blob/main/src/config/ignore-list.json) file.

---
## 🛠 Dependencies

Lin-Autoupdater uses the following dependencies:

- [child_process](https://www.npmjs.com/package/child_process): For executing system commands.
- [fs-extra](https://www.npmjs.com/package/fs-extra): For file system operations.
- [colors](https://www.npmjs.com/package/colors): For terminal colors.
---
## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📞 Support and Issues

For support or to report issues, please visit [GitHub Issues](https://github.com/douxxu/Lin-Autoupdater/issues).

