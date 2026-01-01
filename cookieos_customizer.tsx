import React, { useState } from 'react';
import { Settings, Download, Upload, Save, Trash2, Plus, RefreshCw, Monitor, Image, Palette, Code, Eye, Star, Share2, Search, Filter, Package, Zap, Terminal, Moon, Sun, Copy, Check, Edit3, Heart, Github, Globe, Shield } from 'lucide-react';

const CookieOSCustomizer = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [viewMode, setViewMode] = useState('browse'); // browse, create, preview
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('downloads');
  const [copiedCode, setCopiedCode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const [themes, setThemes] = useState({
    main: [],
    grub: [],
    sddm: [],
    kde: [],
    system: []
  });
  
  const [currentTheme, setCurrentTheme] = useState({
    main: null,
    grub: null,
    sddm: null,
    kde: null,
    system: null
  });

  const tabs = [
    { id: 'main', name: 'Main Panel', icon: Monitor, description: 'Główny wygląd systemu' },
    { id: 'grub', name: 'GRUB', icon: Terminal, description: 'Bootloader i menu startowe' },
    { id: 'sddm', name: 'SDDM', icon: Shield, description: 'Ekran logowania' },
    { id: 'kde', name: 'KDE Plasma', icon: Palette, description: 'Środowisko graficzne' },
    { id: 'system', name: 'System', icon: Settings, description: 'Ikony i czcionki systemowe' }
  ];

  const baseThemes = {
    main: [
      { 
        id: 1, 
        name: 'CookieOS Dark Pro', 
        author: 'CookieOS Team', 
        downloads: 12500,
        rating: 4.9,
        category: 'official',
        tags: ['dark', 'modern', 'minimalist'],
        version: '2.1.0',
        lastUpdate: '2024-12-20',
        description: 'Oficjalny ciemny motyw CookieOS z nowoczesnymi akcentami',
        preview: 'https://placehold.co/400x300/1a1a2e/e94560?text=Dark+Pro',
        colors: { bg: '#1a1a2e', primary: '#16213e', accent: '#0f3460', text: '#e94560' }
      },
      { 
        id: 2, 
        name: 'CookieOS Light', 
        author: 'CookieOS Team', 
        downloads: 8900,
        rating: 4.7,
        category: 'official',
        tags: ['light', 'clean', 'professional'],
        version: '2.0.5',
        lastUpdate: '2024-12-18',
        description: 'Jasny motyw dla użytkowników preferujących światłe interfejsy',
        preview: 'https://placehold.co/400x300/f0f0f0/333333?text=Light',
        colors: { bg: '#f0f0f0', primary: '#ffffff', accent: '#3498db', text: '#333333' }
      },
      { 
        id: 3, 
        name: 'Nord Cookie', 
        author: 'Community', 
        downloads: 4560,
        rating: 4.8,
        category: 'community',
        tags: ['nord', 'pastel', 'cool'],
        version: '1.5.2',
        lastUpdate: '2024-12-15',
        description: 'Motyw inspirowany paletą kolorów Nord',
        preview: 'https://placehold.co/400x300/2e3440/88c0d0?text=Nord',
        colors: { bg: '#2e3440', primary: '#3b4252', accent: '#88c0d0', text: '#eceff4' }
      },
      { 
        id: 4, 
        name: 'Dracula Cookie', 
        author: 'DraculaTheme', 
        downloads: 7820,
        rating: 4.9,
        category: 'community',
        tags: ['dark', 'purple', 'vibrant'],
        version: '3.0.1',
        lastUpdate: '2024-12-22',
        description: 'Kultowy motyw Dracula dostosowany do CookieOS',
        preview: 'https://placehold.co/400x300/282a36/bd93f9?text=Dracula',
        colors: { bg: '#282a36', primary: '#44475a', accent: '#bd93f9', text: '#f8f8f2' }
      },
      { 
        id: 5, 
        name: 'Gruvbox Cookie', 
        author: 'RetroGamer', 
        downloads: 5340,
        rating: 4.6,
        category: 'community',
        tags: ['retro', 'warm', 'cozy'],
        version: '1.8.0',
        lastUpdate: '2024-12-10',
        description: 'Ciepłe kolory inspirowane Gruvbox',
        preview: 'https://placehold.co/400x300/282828/fe8019?text=Gruvbox',
        colors: { bg: '#282828', primary: '#3c3836', accent: '#fe8019', text: '#ebdbb2' }
      },
      { 
        id: 6, 
        name: 'Tokyo Night', 
        author: 'NightOwl', 
        downloads: 6700,
        rating: 4.8,
        category: 'community',
        tags: ['dark', 'neon', 'cyberpunk'],
        version: '2.3.0',
        lastUpdate: '2024-12-25',
        description: 'Neonowe światła Tokio w twoim systemie',
        preview: 'https://placehold.co/400x300/1a1b26/7aa2f7?text=Tokyo+Night',
        colors: { bg: '#1a1b26', primary: '#24283b', accent: '#7aa2f7', text: '#c0caf5' }
      }
    ],
    grub: [
      { 
        id: 1, 
        name: 'Minimal GRUB Pro', 
        author: 'CookieOS Team', 
        downloads: 21000,
        rating: 4.9,
        category: 'official',
        tags: ['minimal', 'fast', 'clean'],
        version: '3.2.1',
        lastUpdate: '2024-12-20',
        description: 'Minimalistyczny bootloader z szybkim startem',
        preview: 'https://placehold.co/400x300/0f0f0f/ffffff?text=Minimal+GRUB',
        colors: { bg: '#0f0f0f', primary: '#1a1a1a', accent: '#00ff00', text: '#ffffff' }
      },
      { 
        id: 2, 
        name: 'Arch Style GRUB', 
        author: 'ArchLinux Community', 
        downloads: 13400,
        rating: 4.7,
        category: 'community',
        tags: ['arch', 'blue', 'classic'],
        version: '2.1.0',
        lastUpdate: '2024-12-18',
        description: 'Klasyczny styl Arch Linux dla bootloadera',
        preview: 'https://placehold.co/400x300/1793d1/ffffff?text=Arch+Style',
        colors: { bg: '#1793d1', primary: '#0c6ba8', accent: '#ffffff', text: '#ffffff' }
      },
      { 
        id: 3, 
        name: 'Dark Matrix GRUB', 
        author: 'MatrixFan', 
        downloads: 7800,
        rating: 4.8,
        category: 'community',
        tags: ['matrix', 'hacker', 'green'],
        version: '1.9.5',
        lastUpdate: '2024-12-15',
        description: 'Efekt Matrix w twoim bootloaderze',
        preview: 'https://placehold.co/400x300/000000/00ff00?text=Matrix',
        colors: { bg: '#000000', primary: '#001100', accent: '#00ff00', text: '#00ff00' }
      },
      { 
        id: 4, 
        name: 'Cyberpunk GRUB', 
        author: 'CyberPunkDev', 
        downloads: 9200,
        rating: 4.6,
        category: 'community',
        tags: ['cyberpunk', 'neon', 'futuristic'],
        version: '2.0.3',
        lastUpdate: '2024-12-22',
        description: 'Futurystyczny bootloader w stylu cyberpunk',
        preview: 'https://placehold.co/400x300/0a0e27/ff00ff?text=Cyberpunk',
        colors: { bg: '#0a0e27', primary: '#1a1f3a', accent: '#ff00ff', text: '#00ffff' }
      }
    ],
    sddm: [
      { 
        id: 1, 
        name: 'Cookie Login Pro', 
        author: 'CookieOS Team', 
        downloads: 18900,
        rating: 4.9,
        category: 'official',
        tags: ['modern', 'elegant', 'blur'],
        version: '4.1.0',
        lastUpdate: '2024-12-21',
        description: 'Elegancki ekran logowania z efektem blur',
        preview: 'https://placehold.co/400x300/1e1e2e/cba6f7?text=Cookie+Login',
        colors: { bg: '#1e1e2e', primary: '#313244', accent: '#cba6f7', text: '#cdd6f4' }
      },
      { 
        id: 2, 
        name: 'Breeze Cookie', 
        author: 'KDE Community', 
        downloads: 11200,
        rating: 4.7,
        category: 'community',
        tags: ['kde', 'breeze', 'clean'],
        version: '5.27.0',
        lastUpdate: '2024-12-19',
        description: 'Motyw Breeze dostosowany do CookieOS',
        preview: 'https://placehold.co/400x300/eff0f1/3daee9?text=Breeze',
        colors: { bg: '#eff0f1', primary: '#fcfcfc', accent: '#3daee9', text: '#232629' }
      },
      { 
        id: 3, 
        name: 'Sugar Dark SDDM', 
        author: 'SugarCandy', 
        downloads: 8900,
        rating: 4.8,
        category: 'community',
        tags: ['candy', 'colorful', 'fun'],
        version: '2.5.0',
        lastUpdate: '2024-12-17',
        description: 'Kolorowy i przyjemny ekran logowania',
        preview: 'https://placehold.co/400x300/2d2a2e/ff6188?text=Sugar+Dark',
        colors: { bg: '#2d2a2e', primary: '#403e41', accent: '#ff6188', text: '#fcfcfa' }
      },
      { 
        id: 4, 
        name: 'Glassmorphism Login', 
        author: 'ModernUI', 
        downloads: 15600,
        rating: 4.9,
        category: 'community',
        tags: ['glass', 'modern', 'transparent'],
        version: '1.2.0',
        lastUpdate: '2024-12-26',
        description: 'Efekt szkła w stylu macOS Big Sur',
        preview: 'https://placehold.co/400x300/1c1c1e/007aff?text=Glass',
        colors: { bg: '#1c1c1e', primary: '#2c2c2e', accent: '#007aff', text: '#ffffff' }
      }
    ],
    kde: [
      { 
        id: 1, 
        name: 'CookieOS Plasma Ultimate', 
        author: 'CookieOS Team', 
        downloads: 32000,
        rating: 4.9,
        category: 'official',
        tags: ['complete', 'premium', 'customizable'],
        version: '6.0.0',
        lastUpdate: '2024-12-28',
        description: 'Kompletny pakiet motywu dla KDE Plasma 6',
        preview: 'https://placehold.co/400x300/181825/cba6f7?text=Plasma+Ultimate',
        colors: { bg: '#181825', primary: '#1e1e2e', accent: '#cba6f7', text: '#cdd6f4' }
      },
      { 
        id: 2, 
        name: 'Sweet Plasma', 
        author: 'EliverLara', 
        downloads: 21000,
        rating: 4.8,
        category: 'community',
        tags: ['sweet', 'purple', 'modern'],
        version: '3.5.0',
        lastUpdate: '2024-12-20',
        description: 'Słodki fioletowy motyw dla Plasmy',
        preview: 'https://placehold.co/400x300/1e1e2e/a855f7?text=Sweet',
        colors: { bg: '#1e1e2e', primary: '#2a2a3e', accent: '#a855f7', text: '#e5e7eb' }
      },
      { 
        id: 3, 
        name: 'Nordic Cookie Plasma', 
        author: 'NordicDev', 
        downloads: 15400,
        rating: 4.7,
        category: 'community',
        tags: ['nordic', 'frost', 'minimalist'],
        version: '2.8.1',
        lastUpdate: '2024-12-16',
        description: 'Chłodne kolory północy w twoim Plasma',
        preview: 'https://placehold.co/400x300/2e3440/81a1c1?text=Nordic',
        colors: { bg: '#2e3440', primary: '#3b4252', accent: '#81a1c1', text: '#eceff4' }
      },
      { 
        id: 4, 
        name: 'Catppuccin Mocha', 
        author: 'Catppuccin', 
        downloads: 28500,
        rating: 4.9,
        category: 'community',
        tags: ['catppuccin', 'pastel', 'cozy'],
        version: '4.2.0',
        lastUpdate: '2024-12-27',
        description: 'Przytulny motyw Catppuccin Mocha',
        preview: 'https://placehold.co/400x300/1e1e2e/f5c2e7?text=Catppuccin',
        colors: { bg: '#1e1e2e', primary: '#313244', accent: '#f5c2e7', text: '#cdd6f4' }
      },
      { 
        id: 5, 
        name: 'One Dark Pro', 
        author: 'VSCodeTheme', 
        downloads: 19800,
        rating: 4.8,
        category: 'community',
        tags: ['vscode', 'dark', 'developer'],
        version: '3.1.0',
        lastUpdate: '2024-12-23',
        description: 'Popularny motyw VS Code dla całego systemu',
        preview: 'https://placehold.co/400x300/282c34/61afef?text=One+Dark',
        colors: { bg: '#282c34', primary: '#21252b', accent: '#61afef', text: '#abb2bf' }
      }
    ],
    system: [
      { 
        id: 1, 
        name: 'Cookie System Icons', 
        author: 'CookieOS Team', 
        downloads: 16700,
        rating: 4.8,
        category: 'official',
        tags: ['icons', 'complete', 'modern'],
        version: '5.0.0',
        lastUpdate: '2024-12-24',
        description: 'Kompletny zestaw ikon systemowych',
        preview: 'https://placehold.co/400x300/1a1a2e/e94560?text=System+Icons',
        colors: { bg: '#1a1a2e', primary: '#16213e', accent: '#e94560', text: '#ffffff' }
      },
      { 
        id: 2, 
        name: 'Arch Cookie Icons', 
        author: 'ArchCommunity', 
        downloads: 12300,
        rating: 4.6,
        category: 'community',
        tags: ['arch', 'minimalist', 'flat'],
        version: '2.4.0',
        lastUpdate: '2024-12-19',
        description: 'Minimalistyczne ikony w stylu Arch',
        preview: 'https://placehold.co/400x300/1793d1/ffffff?text=Arch+Icons',
        colors: { bg: '#1793d1', primary: '#0c6ba8', accent: '#ffffff', text: '#ffffff' }
      },
      { 
        id: 3, 
        name: 'Papirus Cookie', 
        author: 'PapirusDev', 
        downloads: 23400,
        rating: 4.9,
        category: 'community',
        tags: ['papirus', 'colorful', 'detailed'],
        version: '6.1.0',
        lastUpdate: '2024-12-25',
        description: 'Popularny zestaw ikon Papirus dla CookieOS',
        preview: 'https://placehold.co/400x300/363636/5294e2?text=Papirus',
        colors: { bg: '#363636', primary: '#2f2f2f', accent: '#5294e2', text: '#ffffff' }
      },
      { 
        id: 4, 
        name: 'Candy Icons', 
        author: 'SweetDev', 
        downloads: 8900,
        rating: 4.5,
        category: 'community',
        tags: ['colorful', 'fun', 'rounded'],
        version: '1.6.0',
        lastUpdate: '2024-12-14',
        description: 'Kolorowe i zaokrąglone ikony',
        preview: 'https://placehold.co/400x300/ff6b9d/ffffff?text=Candy',
        colors: { bg: '#ff6b9d', primary: '#c44569', accent: '#ffeaa7', text: '#2d3436' }
      }
    ]
  };

  const [customTheme, setCustomTheme] = useState({
    name: '',
    author: '',
    description: '',
    backgroundColor: '#1a1a2e',
    primaryColor: '#16213e',
    accentColor: '#0f3460',
    textColor: '#e94560',
    secondaryColor: '#53354a',
    borderRadius: '8',
    font: 'Inter',
    fontSize: '14',
    spacing: 'normal',
    animations: true,
    transparency: false,
    shadows: true,
    tags: [],
    wallpaper: '',
    iconTheme: 'default',
    cursorTheme: 'default',
    shellTheme: 'default'
  });

  const [previewSettings, setPreviewSettings] = useState({
    showPanel: true,
    showWindow: true,
    showMenu: true,
    darkMode: true
  });

  const categories = ['all', 'official', 'community'];
  const allTags = ['dark', 'light', 'modern', 'minimal', 'colorful', 'retro', 'professional', 'nord', 'dracula', 'cyberpunk'];

  const getFilteredThemes = () => {
    let filtered = [...baseThemes[activeTab], ...themes[activeTab]];
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(theme => theme.category === filterCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(theme => 
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'newest') return new Date(b.lastUpdate || 0) - new Date(a.lastUpdate || 0);
      return 0;
    });

    return filtered;
  };

  const handleDownloadTheme = (panel, theme) => {
    setCurrentTheme(prev => ({ ...prev, [panel]: theme }));
    alert(`✓ Zainstalowano motyw: ${theme.name} (${theme.version})`);
  };

  const handleApplyCustomTheme = () => {
    if (!customTheme.name) {
      alert('⚠️ Podaj nazwę motywu!');
      return;
    }
    const newTheme = {
      id: Date.now(),
      name: customTheme.name,
      author: customTheme.author || 'Ty',
      downloads: 0,
      rating: 5.0,
      category: 'custom',
      tags: customTheme.tags,
      version: '1.0.0',
      lastUpdate: new Date().toISOString().split('T')[0],
      description: customTheme.description || 'Własny motyw',
      custom: true,
      colors: {
        bg: customTheme.backgroundColor,
        primary: customTheme.primaryColor,
        accent: customTheme.accentColor,
        text: customTheme.textColor,
        secondary: customTheme.secondaryColor
      },
      settings: {
        borderRadius: customTheme.borderRadius,
        font: customTheme.font,
        fontSize: customTheme.fontSize,
        spacing: customTheme.spacing,
        animations: customTheme.animations,
        transparency: customTheme.transparency,
        shadows: customTheme.shadows
      }
    };
    setThemes(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newTheme]
    }));
    setCurrentTheme(prev => ({ ...prev, [activeTab]: newTheme }));
    setViewMode('browse');
    alert(`✓ Utworzono i zainstalowano motyw: ${customTheme.name}`);
  };

  const handleSaveConfig = () => {
    const config = {
      version: '1.0',
      cookieOSVersion: '2024.12',
      themes: currentTheme,
      customThemes: themes,
      favorites: favorites,
      timestamp: new Date().toISOString(),
      system: {
        arch: 'x86_64',
        kernel: 'Linux',
        desktop: 'KDE Plasma 6'
      }
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cookieos-config-${Date.now()}.json`;
    a.click();
    alert('✓ Konfiguracja zapisana!');
  };

  const handleExportTheme = (theme) => {
    const exportData = {
      ...theme,
      exportedFrom: 'CookieOS Customizer',
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.replace(/\s/g, '-')}-theme.json`;
    a.click();
  };

  const toggleFavorite = (themeId) => {
    setFavorites(prev => 
      prev.includes(themeId) 
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  const generateThemeCode = () => {
    const theme = currentTheme[activeTab];
    if (!theme) return '';
    
    return `# CookieOS Theme Configuration
# Theme: ${theme.name}
# Author: ${theme.author}
# Version: ${theme.version}

[colors]
background = "${theme.colors?.bg || '#000000'}"
primary = "${theme.colors?.primary || '#111111'}"
accent = "${theme.colors?.accent || '#0000ff'}"
text = "${theme.colors?.text || '#ffffff'}"

[settings]
border_radius = ${theme.settings?.borderRadius || 8}
font_family = "${theme.settings?.font || 'Inter'}"
font_size = ${theme.settings?.fontSize || 14}
animations = ${theme.settings?.animations || true}
transparency = ${theme.settings?.transparency || false}
shadows = ${theme.settings?.shadows || true}`;
  };

  const copyThemeCode = () => {
    const code = generateThemeCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const TabIcon = tabs.find(t => t.id === activeTab)?.icon || Settings;
  const currentTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-black bg-opacity-50 backdrop-blur-lg border-b border-purple-500 border-opacity-30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                CookieOS Customizer
              </h1>
              <p className="text-gray-400 text-sm mt-1">Personalizuj każdy aspekt swojego systemu bazującego na Arch Linux</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveConfig}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Zapisz
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <RefreshCw size={18} />
                Reset
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg scale-105'
                      : 'bg-gray-800 bg-opacity-50 hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tab Description & Stats */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-purple-500 border-opacity-20">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-xl">
                <TabIcon size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{currentTabInfo?.name}</h2>
                <p className="text-gray-400">{currentTabInfo?.description}</p>
                <div className="flex gap-6 mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-purple-400" />
                    <span>{getFilteredThemes().length} motywów</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download size={16} className="text-green-400" />
                    <span>{baseThemes[activeTab].reduce((acc, t) => acc + t.downloads, 0).toLocaleString()} pobrań</span>
                  </div>
                  {currentTheme[activeTab] && (
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-yellow-400" />
                      <span>Aktywny: {currentTheme[activeTab].name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('browse')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  viewMode === 'browse' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Eye size={18} className="inline mr-2" />
                Przeglądaj
              </button>
              <button
                onClick={() => setViewMode('create')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  viewMode === 'create' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Plus size={18} className="inline mr-2" />
                Utwórz
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  viewMode === 'preview' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Monitor size={18} className="inline mr-2" />
                Podgląd
              </button>
            </div>
          </div>
        </div>

        {/* Browse Mode */}
        {viewMode === 'browse' && (
          <>
            {/* Search & Filters */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-4 mb-6 border border-purple-500 border-opacity-20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Szukaj motywów..."
                      className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Wszystkie kategorie</option>
                    <option value="official">Oficjalne</option>
                    <option value="community">Społeczność</option>
                    <option value="custom">Własne</option>
                  </select>
                </div>
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="downloads">Najpopularniejsze</option>
                    <option value="rating">Najwyżej oceniane</option>
                    <option value="newest">Najnowsze</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Themes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredThemes().map(theme => (
                <div
                  key={theme.id}
                  className={`bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-2xl ${
                    currentTheme[activeTab]?.id === theme.id 
                      ? 'border-green-500 shadow-green-500/50' 
                      : theme.custom 
                        ? 'border-purple-500 border-opacity-50'
                        : 'border-gray-700'
                  }`}
                >
                  {/* Preview Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-800">
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors?.bg || '#000'}, ${theme.colors?.primary || '#111'})`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div 
                            className="text-6xl font-bold mb-2"
                            style={{ color: theme.colors?.accent || '#fff' }}
                          >
                            {theme.name.charAt(0)}
                          </div>
                          <div 
                            className="text-sm"
                            style={{ color: theme.colors?.text || '#fff' }}
                          >
                            {theme.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(theme.id)}
                      className="absolute top-3 right-3 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <Heart 
                        size={20} 
                        className={favorites.includes(theme.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                      />
                    </button>
                  </div>

                  {/* Theme Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{theme.name}</h3>
                        <p className="text-sm text-gray-400">
                          {theme.author} • v{theme.version}
                        </p>
                      </div>
                      {theme.category === 'official' && (
                        <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">Official</span>
                      )}
                      {theme.custom && (
                        <span className="bg-purple-600 text-xs px-2 py-1 rounded-full">Custom</span>
                      )}
                    </div>

                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      {theme.description}
                    </p>

                    {/* Tags */}
                    {theme.tags && theme.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {theme.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="bg-gray-700 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span>{theme.rating?.toFixed(1) || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download size={14} className="text-green-400" />
                        <span>{theme.downloads?.toLocaleString() || 0}</span>
                      </div>
                      <div className="text-gray-400 text-xs ml-auto">
                        {theme.lastUpdate}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadTheme(activeTab, theme)}
                        className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                          currentTheme[activeTab]?.id === theme.id
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        }`}
                      >
                        {currentTheme[activeTab]?.id === theme.id ? (
                          <>
                            <Check size={18} />
                            Aktywny
                          </>
                        ) : (
                          <>
                            <Download size={18} />
                            Instaluj
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleExportTheme(theme)}
                        className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-all"
                        title="Eksportuj motyw"
                      >
                        <Upload size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Create Mode */}
        {viewMode === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Theme Creator Form */}
            <div className="lg:col-span-2 bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-6 border border-purple-500 border-opacity-20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Edit3 size={24} />
                Kreator własnego motywu
              </h2>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                  <h3 className="font-bold mb-4 text-lg">Podstawowe informacje</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nazwa motywu *</label>
                      <input
                        type="text"
                        value={customTheme.name}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Mój Super Motyw"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Autor</label>
                      <input
                        type="text"
                        value={customTheme.author}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full bg-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Twoje imię"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold mb-2">Opis</label>
                    <textarea
                      value={customTheme.description}
                      onChange={(e) => setCustomTheme(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                      placeholder="Krótki opis twojego motywu..."
                    />
                  </div>
                </div>

                {/* Colors */}
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                  <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
                    <Palette size={20} />
                    Kolory
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Tło</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customTheme.backgroundColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="w-16 h-10 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customTheme.backgroundColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="flex-1 bg-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Główny</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customTheme.primaryColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="w-16 h-10 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customTheme.primaryColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="flex-1 bg-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Akcent</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customTheme.accentColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="w-16 h-10 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customTheme.accentColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="flex-1 bg-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Tekst</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customTheme.textColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, textColor: e.target.value }))}
                          className="w-16 h-10 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customTheme.textColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, textColor: e.target.value }))}
                          className="flex-1 bg-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Drugorzędny</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customTheme.secondaryColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="w-16 h-10 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customTheme.secondaryColor}
                          onChange={(e) => setCustomTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="flex-1 bg-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography & Spacing */}
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                  <h3 className="font-bold mb-4 text-lg">Typografia i odstępy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Czcionka</label>
                      <select
                        value={customTheme.font}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, font: e.target.value }))}
                        className="w-full bg-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Ubuntu">Ubuntu</option>
                        <option value="Fira Sans">Fira Sans</option>
                        <option value="JetBrains Mono">JetBrains Mono</option>
                        <option value="Source Code Pro">Source Code Pro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Rozmiar czcionki: {customTheme.fontSize}px</label>
                      <input
                        type="range"
                        min="10"
                        max="20"
                        value={customTheme.fontSize}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, fontSize: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Zaokrąglenie: {customTheme.borderRadius}px</label>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={customTheme.borderRadius}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, borderRadius: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold mb-2">Odstępy</label>
                    <select
                      value={customTheme.spacing}
                      onChange={(e) => setCustomTheme(prev => ({ ...prev, spacing: e.target.value }))}
                      className="w-full bg-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="compact">Kompaktowy</option>
                      <option value="normal">Normalny</option>
                      <option value="relaxed">Luźny</option>
                    </select>
                  </div>
                </div>

                {/* Effects */}
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                  <h3 className="font-bold mb-4 text-lg">Efekty wizualne</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customTheme.animations}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, animations: e.target.checked }))}
                        className="w-5 h-5 rounded bg-gray-600 border-gray-500 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="font-semibold">Animacje</span>
                      <span className="text-sm text-gray-400">Płynne przejścia i efekty</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customTheme.transparency}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, transparency: e.target.checked }))}
                        className="w-5 h-5 rounded bg-gray-600 border-gray-500 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="font-semibold">Przezroczystość</span>
                      <span className="text-sm text-gray-400">Efekt blur i transparencja</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customTheme.shadows}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, shadows: e.target.checked }))}
                        className="w-5 h-5 rounded bg-gray-600 border-gray-500 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="font-semibold">Cienie</span>
                      <span className="text-sm text-gray-400">Głębia i wymiar elementów</span>
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                  <h3 className="font-bold mb-4 text-lg">Tagi</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          setCustomTheme(prev => ({
                            ...prev,
                            tags: prev.tags.includes(tag)
                              ? prev.tags.filter(t => t !== tag)
                              : [...prev.tags, tag]
                          }));
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                          customTheme.tags.includes(tag)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Create Button */}
                <button
                  onClick={handleApplyCustomTheme}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                  <Plus size={24} />
                  Utwórz i zainstaluj motyw
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-6 border border-purple-500 border-opacity-20">
              <h3 className="text-xl font-bold mb-4">Podgląd na żywo</h3>
              <div 
                className="rounded-lg p-4 min-h-96 transition-all"
                style={{
                  backgroundColor: customTheme.backgroundColor,
                  borderRadius: `${customTheme.borderRadius}px`
                }}
              >
                <div 
                  className="rounded-lg p-4 mb-4"
                  style={{
                    backgroundColor: customTheme.primaryColor,
                    borderRadius: `${customTheme.borderRadius}px`,
                    boxShadow: customTheme.shadows ? '0 4px 6px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  <h4 
                    className="font-bold text-lg mb-2"
                    style={{ 
                      color: customTheme.textColor,
                      fontFamily: customTheme.font,
                      fontSize: `${customTheme.fontSize}px`
                    }}
                  >
                    Przykładowy nagłówek
                  </h4>
                  <p 
                    className="text-sm opacity-80"
                    style={{ 
                      color: customTheme.textColor,
                      fontFamily: customTheme.font
                    }}
                  >
                    To jest przykładowy tekst pokazujący wygląd twojego motywu.
                  </p>
                </div>
                
                <button
                  className="w-full py-2 rounded font-semibold transition-all"
                  style={{
                    backgroundColor: customTheme.accentColor,
                    color: customTheme.textColor,
                    borderRadius: `${customTheme.borderRadius}px`,
                    fontFamily: customTheme.font,
                    transform: customTheme.animations ? 'scale(1)' : 'none',
                    boxShadow: customTheme.shadows ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  Przykładowy przycisk
                </button>

                <div className="mt-4 space-y-2">
                  {['Element 1', 'Element 2', 'Element 3'].map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded"
                      style={{
                        backgroundColor: customTheme.secondaryColor,
                        color: customTheme.textColor,
                        borderRadius: `${customTheme.borderRadius}px`,
                        fontFamily: customTheme.font,
                        opacity: customTheme.transparency ? 0.9 : 1
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 bg-gray-700 rounded-lg p-3">
                <p className="text-sm text-gray-300 mb-2">Wybrane kolory:</p>
                <div className="flex gap-2">
                  {[
                    customTheme.backgroundColor,
                    customTheme.primaryColor,
                    customTheme.accentColor,
                    customTheme.textColor,
                    customTheme.secondaryColor
                  ].map((color, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded border-2 border-white"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Mode */}
        {viewMode === 'preview' && currentTheme[activeTab] && (
          <div className="space-y-6">
            {/* Preview Controls */}
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-6 border border-purple-500 border-opacity-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Podgląd: {currentTheme[activeTab].name}</h2>
                <div className="flex gap-3">
                  {copiedCode ? (
                    <button className="bg-green-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                      <Check size={18} />
                      Skopiowano!
                    </button>
                  ) : (
                    <button
                      onClick={copyThemeCode}
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                    >
                      <Copy size={18} />
                      Kopiuj kod
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {['showPanel', 'showWindow', 'showMenu', 'darkMode'].map(setting => (
                  <label key={setting} className="flex items-center gap-2 cursor-pointer bg-gray-700 p-3 rounded-lg">
                    <input
                      type="checkbox"
                      checked={previewSettings[setting]}
                      onChange={(e) => setPreviewSettings(prev => ({ ...prev, [setting]: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">
                      {setting === 'showPanel' && 'Panel'}
                      {setting === 'showWindow' && 'Okno'}
                      {setting === 'showMenu' && 'Menu'}
                      {setting === 'darkMode' && 'Tryb ciemny'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Full Preview */}
            <div 
              className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-8 border border-purple-500 border-opacity-20 min-h-screen"
              style={{
                backgroundColor: currentTheme[activeTab].colors?.bg || '#1a1a2e',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Desktop Preview */}
              <div className="space-y-6">
                {/* Top Panel */}
                {previewSettings.showPanel && (
                  <div 
                    className="rounded-lg p-4 flex items-center justify-between"
                    style={{
                      backgroundColor: currentTheme[activeTab].colors?.primary || '#16213e',
                      color: currentTheme[activeTab].colors?.text || '#fff'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="font-semibold">CookieOS Desktop</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <span>🌐 Network</span>
                      <span>🔊 Sound</span>
                      <span>🔋 100%</span>
                      <span>🕐 {new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                )}

                {/* Application Window */}
                {previewSettings.showWindow && (
                  <div 
                    className="rounded-lg overflow-hidden shadow-2xl"
                    style={{
                      backgroundColor: currentTheme[activeTab].colors?.primary || '#16213e',
                      border: `2px solid ${currentTheme[activeTab].colors?.accent || '#0f3460'}`
                    }}
                  >
                    {/* Window Title Bar */}
                    <div 
                      className="p-3 flex items-center justify-between border-b"
                      style={{
                        backgroundColor: currentTheme[activeTab].colors?.accent || '#0f3460',
                        borderColor: currentTheme[activeTab].colors?.bg || '#1a1a2e',
                        color: currentTheme[activeTab].colors?.text || '#fff'
                      }}
                    >
                      <span className="font-semibold">Aplikacja CookieOS</span>
                      <div className="flex gap-2">
                        <button className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600"></button>
                        <button className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600"></button>
                        <button className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600"></button>
                      </div>
                    </div>

                    {/* Window Content */}
                    <div className="p-6">
                      <h3 
                        className="text-2xl font-bold mb-4"
                        style={{ color: currentTheme[activeTab].colors?.text || '#fff' }}
                      >
                        Witaj w CookieOS!
                      </h3>
                      <p 
                        className="mb-4 opacity-80"
                        style={{ color: currentTheme[activeTab].colors?.text || '#fff' }}
                      >
                        To jest przykładowe okno aplikacji pokazujące wygląd twojego motywu w praktyce.
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {['Funkcja 1', 'Funkcja 2', 'Funkcja 3'].map((item, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-lg text-center transition-all hover:scale-105"
                            style={{
                              backgroundColor: currentTheme[activeTab].colors?.bg || '#1a1a2e',
                              color: currentTheme[activeTab].colors?.text || '#fff'
                            }}
                          >
                            <div className="text-3xl mb-2">
                              {i === 0 ? '⚙️' : i === 1 ? '📊' : '🚀'}
                            </div>
                            <div className="text-sm font-semibold">{item}</div>
                          </div>
                        ))}
                      </div>

                      <button
                        className="w-full py-3 rounded-lg font-bold transition-all hover:scale-105"
                        style={{
                          backgroundColor: currentTheme[activeTab].colors?.accent || '#0f3460',
                          color: currentTheme[activeTab].colors?.text || '#fff'
                        }}
                      >
                        Przykładowy przycisk akcji
                      </button>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div
                          className="p-4 rounded-lg"
                          style={{
                            backgroundColor: currentTheme[activeTab].colors?.bg || '#1a1a2e',
                            color: currentTheme[activeTab].colors?.text || '#fff'
                          }}
                        >
                          <div className="text-sm opacity-70 mb-1">CPU Usage</div>
                          <div className="text-2xl font-bold">45%</div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                width: '45%',
                                backgroundColor: currentTheme[activeTab].colors?.accent || '#0f3460'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div
                          className="p-4 rounded-lg"
                          style={{
                            backgroundColor: currentTheme[activeTab].colors?.bg || '#1a1a2e',
                            color: currentTheme[activeTab].colors?.text || '#fff'
                          }}
                        >
                          <div className="text-sm opacity-70 mb-1">RAM Usage</div>
                          <div className="text-2xl font-bold">8.2 GB</div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                width: '68%',
                                backgroundColor: currentTheme[activeTab].colors?.accent || '#0f3460'
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Context Menu Preview */}
                {previewSettings.showMenu && (
                  <div className="flex justify-center">
                    <div 
                      className="rounded-lg shadow-2xl overflow-hidden w-64"
                      style={{
                        backgroundColor: currentTheme[activeTab].colors?.primary || '#16213e',
                        border: `1px solid ${currentTheme[activeTab].colors?.accent || '#0f3460'}`
                      }}
                    >
                      {['Otwórz', 'Edytuj', 'Kopiuj', 'Wklej', 'Usuń', 'Właściwości'].map((item, i) => (
                        <div
                          key={i}
                          className="px-4 py-2.5 cursor-pointer transition-all hover:scale-105"
                          style={{
                            color: currentTheme[activeTab].colors?.text || '#fff',
                            backgroundColor: i % 2 === 0 
                              ? currentTheme[activeTab].colors?.primary 
                              : currentTheme[activeTab].colors?.bg,
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terminal Preview */}
                <div 
                  className="rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    backgroundColor: currentTheme[activeTab].colors?.bg || '#1a1a2e',
                    border: `2px solid ${currentTheme[activeTab].colors?.accent || '#0f3460'}`
                  }}
                >
                  <div 
                    className="px-4 py-2 flex items-center gap-2"
                    style={{
                      backgroundColor: currentTheme[activeTab].colors?.primary || '#16213e',
                      color: currentTheme[activeTab].colors?.text || '#fff'
                    }}
                  >
                    <Terminal size={16} />
                    <span className="font-semibold">Terminal</span>
                  </div>
                  <div 
                    className="p-4 font-mono text-sm"
                    style={{ color: currentTheme[activeTab].colors?.text || '#fff' }}
                  >
                    <div className="mb-2">
                      <span style={{ color: currentTheme[activeTab].colors?.accent }}>user@cookieos</span>
                      <span className="opacity-70">:</span>
                      <span style={{ color: currentTheme[activeTab].colors?.accent }}>~</span>
                      <span className="opacity-70">$ </span>
                      neofetch
                    </div>
                    <div className="opacity-80 space-y-1">
                      <div>OS: CookieOS (Arch Linux)</div>
                      <div>Kernel: 6.6.10-arch1-1</div>
                      <div>Theme: {currentTheme[activeTab].name}</div>
                      <div>DE: KDE Plasma 6.0</div>
                      <div>Terminal: Konsole</div>
                    </div>
                    <div className="mt-4">
                      <span style={{ color: currentTheme[activeTab].colors?.accent }}>user@cookieos</span>
                      <span className="opacity-70">:</span>
                      <span style={{ color: currentTheme[activeTab].colors?.accent }}>~</span>
                      <span className="opacity-70">$ </span>
                      <span className="animate-pulse">_</span>
                    </div>
                  </div>
                </div>

                {/* Theme Configuration Code */}
                <div 
                  className="rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    backgroundColor: currentTheme[activeTab].colors?.primary || '#16213e',
                    border: `2px solid ${currentTheme[activeTab].colors?.accent || '#0f3460'}`
                  }}
                >
                  <div 
                    className="px-4 py-2 flex items-center justify-between"
                    style={{
                      backgroundColor: currentTheme[activeTab].colors?.accent || '#0f3460',
                      color: currentTheme[activeTab].colors?.text || '#fff'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Code size={16} />
                      <span className="font-semibold">Konfiguracja motywu</span>
                    </div>
                    <button
                      onClick={copyThemeCode}
                      className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
                    >
                      {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                      {copiedCode ? 'Skopiowano' : 'Kopiuj'}
                    </button>
                  </div>
                  <pre 
                    className="p-4 overflow-x-auto text-sm font-mono"
                    style={{ 
                      color: currentTheme[activeTab].colors?.text || '#fff',
                      backgroundColor: currentTheme[activeTab].colors?.bg || '#1a1a2e'
                    }}
                  >
                    {generateThemeCode()}
                  </pre>
                </div>
              </div>
            </div>

            {/* Theme Details */}
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-6 border border-purple-500 border-opacity-20">
              <h3 className="text-xl font-bold mb-4">Szczegóły motywu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Nazwa</div>
                  <div className="font-semibold">{currentTheme[activeTab].name}</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Autor</div>
                  <div className="font-semibold">{currentTheme[activeTab].author}</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Wersja</div>
                  <div className="font-semibold">{currentTheme[activeTab].version}</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Ostatnia aktualizacja</div>
                  <div className="font-semibold">{currentTheme[activeTab].lastUpdate}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm text-gray-400 mb-3">Paleta kolorów</div>
                <div className="grid grid-cols-5 gap-3">
                  {Object.entries(currentTheme[activeTab].colors || {}).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div 
                        className="w-full h-20 rounded-lg border-2 border-white"
                        style={{ backgroundColor: value }}
                      ></div>
                      <div className="text-xs text-center">
                        <div className="font-semibold capitalize">{key}</div>
                        <div className="text-gray-400">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {currentTheme[activeTab].tags && currentTheme[activeTab].tags.length > 0 && (
                <div className="mt-6">
                  <div className="text-sm text-gray-400 mb-3">Tagi</div>
                  <div className="flex flex-wrap gap-2">
                    {currentTheme[activeTab].tags.map(tag => (
                      <span key={tag} className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {currentTheme[activeTab].description && (
                <div className="mt-6">
                  <div className="text-sm text-gray-400 mb-2">Opis</div>
                  <p className="text-gray-300">{currentTheme[activeTab].description}</p>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleExportTheme(currentTheme[activeTab])}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Eksportuj motyw
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Czy na pewno chcesz udostępnić ten motyw?')) {
                      alert('🌐 Funkcja udostępniania zostanie dodana w przyszłej aktualizacji!');
                    }
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  Udostępnij
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Current Theme Status Bar */}
        <div className="fixed bottom-6 right-6 bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-purple-500 border-opacity-30 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
              <Settings size={24} />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-400">Aktywne motywy</div>
              <div className="text-sm font-semibold">
                {Object.entries(currentTheme).filter(([_, theme]) => theme !== null).length} / 5
              </div>
            </div>
            <button
              onClick={() => {
                const hasThemes = Object.values(currentTheme).some(t => t !== null);
                if (hasThemes) {
                  alert(`🎨 Zainstalowane motywy:\n\n${Object.entries(currentTheme)
                    .filter(([_, theme]) => theme !== null)
                    .map(([panel, theme]) => `${panel.toUpperCase()}: ${theme.name}`)
                    .join('\n')}`);
                } else {
                  alert('ℹ️ Nie zainstalowano jeszcze żadnych motywów.');
                }
              }}
              className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition-all"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 left-6 flex flex-col gap-3">
          <button
            onClick={() => {
              const stats = {
                totalThemes: Object.values(baseThemes).flat().length + Object.values(themes).flat().length,
                installed: Object.values(currentTheme).filter(t => t !== null).length,
                custom: Object.values(themes).flat().length,
                favorites: favorites.length
              };
              alert(`📊 Statystyki CookieOS Customizer\n\n` +
                `🎨 Dostępne motywy: ${stats.totalThemes}\n` +
                `✓ Zainstalowane: ${stats.installed}\n` +
                `⭐ Ulubione: ${stats.favorites}\n` +
                `🛠️ Własne: ${stats.custom}`);
            }}
            className="bg-gray-800 bg-opacity-90 backdrop-blur-lg hover:bg-gray-700 p-4 rounded-full shadow-lg transition-all hover:scale-110"
            title="Statystyki"
          >
            <Package size={24} />
          </button>
          <button
            onClick={() => {
              alert('💡 Skróty klawiszowe:\n\n' +
                'Ctrl + S - Zapisz konfigurację\n' +
                'Ctrl + N - Nowy motyw\n' +
                'Ctrl + P - Podgląd\n' +
                'Ctrl + E - Eksport\n' +
                'Tab - Przełącz zakładki');
            }}
            className="bg-gray-800 bg-opacity-90 backdrop-blur-lg hover:bg-gray-700 p-4 rounded-full shadow-lg transition-all hover:scale-110"
            title="Pomoc"
          >
            <Globe size={24} />
          </button>
          <button
            onClick={() => {
              window.open('https://github.com/cookieos', '_blank');
            }}
            className="bg-gray-800 bg-opacity-90 backdrop-blur-lg hover:bg-gray-700 p-4 rounded-full shadow-lg transition-all hover:scale-110"
            title="GitHub"
          >
            <Github size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieOSCustomizer;