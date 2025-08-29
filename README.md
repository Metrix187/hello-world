# Substance Wiki

A comprehensive GitHub Pages site providing accurate, evidence-based information about psychoactive substances, safety guidelines, and harm reduction practices.

## 🌟 Features

- **Modern Responsive Design**: Beautiful, accessible interface that works on all devices
- **Comprehensive Database**: Detailed information on various substances including effects, dosage, and safety
- **Interactive Search**: Real-time search functionality across all substances
- **Category Filtering**: Easy browsing by substance categories (psychedelics, stimulants, depressants, etc.)
- **Safety Focus**: Harm reduction principles and emergency resources
- **Mobile-First**: Optimized for mobile devices with touch-friendly navigation

## 🚀 Quick Start

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages** in your repository settings
3. **Customize the content** by editing the HTML, CSS, and JavaScript files
4. **Update the configuration** in `_config.yml` with your information
5. **Deploy** - your site will be available at `https://yourusername.github.io/repository-name`

## 📁 Project Structure

```
substance-wiki/
├── index.html          # Main homepage
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── 404.html            # Custom 404 error page
├── _config.yml         # GitHub Pages configuration
├── CNAME               # Custom domain configuration (optional)
├── robots.txt          # Search engine instructions
└── README.md           # This file
```

## 🎨 Customization

### Adding New Substances

Edit the `substances` array in `script.js`:

```javascript
{
    name: 'Substance Name',
    category: 'psychedelics', // or stimulants, depressants, etc.
    description: 'Brief description...',
    dosage: 'Typical dosage range',
    duration: 'Duration of effects',
    roa: 'Route of administration'
}
```

### Styling

The site uses CSS custom properties for easy theming. Edit the `:root` variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #10b981;
    /* ... other variables */
}
```

### Configuration

Update `_config.yml` with your site information:

```yaml
title: "Your Wiki Name"
description: "Your description"
url: "https://yourusername.github.io"
```

## 🛡️ Safety and Legal Disclaimer

This website is for **educational purposes only** and should not be considered medical advice. The information provided:

- Is not intended to encourage illegal activity
- Should not replace professional medical consultation
- Focuses on harm reduction rather than promotion of use
- Is based on available research and community knowledge

Always consult healthcare professionals and be aware of local laws and regulations.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Areas for contribution:
- Additional substance information
- Safety resources
- UI/UX improvements
- Accessibility enhancements
- Documentation

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: Interactive functionality without dependencies
- **GitHub Pages**: Free hosting and deployment
- **Jekyll**: Static site generation (optional)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/substance-wiki/issues) section
2. Create a new issue with detailed information
3. For urgent safety questions, contact appropriate emergency services

## 🌐 Live Demo

Visit the live demo: [https://yourusername.github.io/substance-wiki](https://yourusername.github.io/substance-wiki)

---

**Remember**: This is an educational resource focused on harm reduction and safety. Always prioritize your health and follow local laws.
