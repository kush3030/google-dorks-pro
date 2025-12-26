import { Dork } from '@/types/dork';

export const dorks: Dork[] = [
  // EXPOSED FILES
  {
    id: 'ef-001',
    title: 'Exposed .env Files',
    description: 'Find publicly accessible .env files containing API keys, database credentials, and secrets',
    query: 'site:{DOMAIN} ext:env "DB_PASSWORD" | "API_KEY" | "SECRET"',
    category: 'exposed-files',
    severity: 'critical',
    tags: ['credentials', 'api-keys', 'secrets', 'configuration'],
    examples: ['site:example.com ext:env "DB_PASSWORD"'],
  },
  {
    id: 'ef-002',
    title: 'Exposed Git Repositories',
    description: 'Discover exposed .git directories that may contain source code and sensitive data',
    query: 'site:{DOMAIN} inurl:".git" intitle:"Index of /.git"',
    category: 'exposed-files',
    severity: 'high',
    tags: ['git', 'source-code', 'version-control'],
  },
  {
    id: 'ef-003',
    title: 'Configuration Files',
    description: 'Find exposed configuration files (config.php, config.json, etc.)',
    query: 'site:{DOMAIN} ext:php | ext:json | ext:yaml intext:"password" | intext:"username"',
    category: 'exposed-files',
    severity: 'high',
    tags: ['configuration', 'credentials'],
  },
  {
    id: 'ef-004',
    title: 'Backup Files',
    description: 'Locate backup files that might contain sensitive information',
    query: 'site:{DOMAIN} ext:bak | ext:backup | ext:old | ext:save',
    category: 'exposed-files',
    severity: 'medium',
    tags: ['backup', 'old-files'],
  },
  {
    id: 'ef-005',
    title: 'SQL Dump Files',
    description: 'Find database dump files with potential sensitive data',
    query: 'site:{DOMAIN} ext:sql | ext:dump intext:"INSERT INTO" | intext:"CREATE TABLE"',
    category: 'exposed-files',
    severity: 'critical',
    tags: ['database', 'sql', 'data-leak'],
  },
  {
    id: 'ef-006',
    title: 'Log Files',
    description: 'Discover exposed log files that may contain errors, credentials, or system information',
    query: 'site:{DOMAIN} ext:log | ext:txt intext:"error" | intext:"warning"',
    category: 'exposed-files',
    severity: 'medium',
    tags: ['logs', 'errors', 'debugging'],
  },
  {
    id: 'ef-007',
    title: 'PHP Info Pages',
    description: 'Find phpinfo() pages exposing server configuration',
    query: 'site:{DOMAIN} inurl:phpinfo.php | inurl:info.php',
    category: 'exposed-files',
    severity: 'medium',
    tags: ['php', 'server-info', 'configuration'],
  },
  {
    id: 'ef-008',
    title: 'WordPress Config',
    description: 'Locate exposed WordPress configuration files',
    query: 'site:{DOMAIN} inurl:wp-config.php | inurl:wp-config.txt',
    category: 'exposed-files',
    severity: 'critical',
    platform: 'WordPress',
    tags: ['wordpress', 'configuration', 'credentials'],
  },
  {
    id: 'ef-009',
    title: 'Exposed Documents',
    description: 'Find publicly accessible PDF, DOC, XLS files that might contain sensitive info',
    query: 'site:{DOMAIN} ext:pdf | ext:doc | ext:docx | ext:xls | ext:xlsx',
    category: 'sensitive-data',
    severity: 'medium',
    tags: ['documents', 'files', 'data-leak'],
  },
  {
    id: 'ef-010',
    title: 'Jenkins Config',
    description: 'Find exposed Jenkins configuration and credential files',
    query: 'site:{DOMAIN} inurl:"/jenkins" | inurl:"/hudson" intitle:"Dashboard"',
    category: 'exposed-files',
    severity: 'high',
    platform: 'Jenkins',
    tags: ['jenkins', 'ci-cd', 'credentials'],
  },

  // VULNERABILITIES - XSS
  {
    id: 'vuln-xss-001',
    title: 'XSS in Search Parameters',
    description: 'Find search functionality that might be vulnerable to XSS',
    query: 'site:{DOMAIN} inurl:search | inurl:query | inurl:q=',
    category: 'vulnerabilities',
    vulnerabilityType: 'xss',
    severity: 'medium',
    tags: ['xss', 'search', 'input'],
  },
  {
    id: 'vuln-xss-002',
    title: 'Reflected XSS in URLs',
    description: 'Identify pages with user input reflected in URLs',
    query: 'site:{DOMAIN} inurl:page= | inurl:url= | inurl:redirect=',
    category: 'vulnerabilities',
    vulnerabilityType: 'xss',
    severity: 'medium',
    tags: ['xss', 'reflected', 'url-parameters'],
  },
  {
    id: 'vuln-xss-003',
    title: 'Error Pages with Input',
    description: 'Find error pages that reflect user input',
    query: 'site:{DOMAIN} inurl:error | inurl:404 | inurl:500',
    category: 'vulnerabilities',
    vulnerabilityType: 'xss',
    severity: 'low',
    tags: ['xss', 'error-pages'],
  },

  // VULNERABILITIES - SQL INJECTION
  {
    id: 'vuln-sqli-001',
    title: 'SQL Injection - ID Parameters',
    description: 'Find pages with ID parameters potentially vulnerable to SQLi',
    query: 'site:{DOMAIN} inurl:id= | inurl:userid= | inurl:productid=',
    category: 'vulnerabilities',
    vulnerabilityType: 'sqli',
    severity: 'critical',
    tags: ['sqli', 'injection', 'database'],
  },
  {
    id: 'vuln-sqli-002',
    title: 'SQL Injection - Category Parameters',
    description: 'Locate category/filter parameters for SQLi testing',
    query: 'site:{DOMAIN} inurl:category= | inurl:cat= | inurl:filter=',
    category: 'vulnerabilities',
    vulnerabilityType: 'sqli',
    severity: 'high',
    tags: ['sqli', 'parameters'],
  },
  {
    id: 'vuln-sqli-003',
    title: 'SQL Errors Exposed',
    description: 'Find pages displaying SQL error messages',
    query: 'site:{DOMAIN} intext:"SQL syntax" | intext:"mysql_fetch" | intext:"ORA-"',
    category: 'vulnerabilities',
    vulnerabilityType: 'sqli',
    severity: 'medium',
    tags: ['sqli', 'errors', 'information-disclosure'],
  },

  // VULNERABILITIES - SSRF
  {
    id: 'vuln-ssrf-001',
    title: 'SSRF - URL Parameters',
    description: 'Find endpoints that fetch external URLs (potential SSRF)',
    query: 'site:{DOMAIN} inurl:url= | inurl:link= | inurl:src= | inurl:redirect=',
    category: 'vulnerabilities',
    vulnerabilityType: 'ssrf',
    severity: 'high',
    tags: ['ssrf', 'url-parameters'],
  },
  {
    id: 'vuln-ssrf-002',
    title: 'SSRF - Proxy & Fetch',
    description: 'Locate proxy or fetch functionality',
    query: 'site:{DOMAIN} inurl:proxy | inurl:fetch | inurl:download',
    category: 'vulnerabilities',
    vulnerabilityType: 'ssrf',
    severity: 'high',
    tags: ['ssrf', 'proxy'],
  },

  // VULNERABILITIES - LFI
  {
    id: 'vuln-lfi-001',
    title: 'LFI - File Parameters',
    description: 'Find file inclusion vulnerabilities',
    query: 'site:{DOMAIN} inurl:file= | inurl:path= | inurl:page= | inurl:include=',
    category: 'vulnerabilities',
    vulnerabilityType: 'lfi',
    severity: 'high',
    tags: ['lfi', 'file-inclusion'],
  },
  {
    id: 'vuln-lfi-002',
    title: 'LFI - Template & View Parameters',
    description: 'Locate template/view parameters for LFI testing',
    query: 'site:{DOMAIN} inurl:template= | inurl:view= | inurl:load=',
    category: 'vulnerabilities',
    vulnerabilityType: 'lfi',
    severity: 'high',
    tags: ['lfi', 'templates'],
  },

  // VULNERABILITIES - Open Redirect
  {
    id: 'vuln-or-001',
    title: 'Open Redirect',
    description: 'Find potential open redirect vulnerabilities',
    query: 'site:{DOMAIN} inurl:redirect= | inurl:return= | inurl:next= | inurl:redir=',
    category: 'vulnerabilities',
    vulnerabilityType: 'open-redirect',
    severity: 'low',
    tags: ['open-redirect', 'phishing'],
  },

  // CLOUD STORAGE
  {
    id: 'cloud-001',
    title: 'AWS S3 Buckets',
    description: 'Discover AWS S3 buckets associated with the domain',
    query: 'site:s3.amazonaws.com "{DOMAIN}"',
    category: 'cloud-storage',
    severity: 'high',
    platform: 'AWS',
    tags: ['aws', 's3', 'cloud', 'storage'],
  },
  {
    id: 'cloud-002',
    title: 'Azure Blob Storage',
    description: 'Find Azure blob storage containers',
    query: 'site:blob.core.windows.net "{DOMAIN}"',
    category: 'cloud-storage',
    severity: 'high',
    platform: 'Azure',
    tags: ['azure', 'blob', 'cloud', 'storage'],
  },
  {
    id: 'cloud-003',
    title: 'Google Cloud Storage',
    description: 'Locate Google Cloud Storage buckets',
    query: 'site:storage.googleapis.com "{DOMAIN}"',
    category: 'cloud-storage',
    severity: 'high',
    platform: 'GCP',
    tags: ['gcp', 'cloud', 'storage'],
  },
  {
    id: 'cloud-004',
    title: 'DigitalOcean Spaces',
    description: 'Find DigitalOcean Spaces',
    query: 'site:digitaloceanspaces.com "{DOMAIN}"',
    category: 'cloud-storage',
    severity: 'medium',
    platform: 'DigitalOcean',
    tags: ['digitalocean', 'spaces', 'cloud'],
  },

  // AUTHENTICATION
  {
    id: 'auth-001',
    title: 'Login Pages',
    description: 'Find login and authentication pages',
    query: 'site:{DOMAIN} inurl:login | inurl:signin | inurl:auth',
    category: 'authentication',
    severity: 'info',
    tags: ['login', 'authentication'],
  },
  {
    id: 'auth-002',
    title: 'Admin Panels',
    description: 'Locate admin and control panels',
    query: 'site:{DOMAIN} inurl:admin | inurl:administrator | inurl:dashboard',
    category: 'authentication',
    severity: 'medium',
    tags: ['admin', 'panel', 'dashboard'],
  },
  {
    id: 'auth-003',
    title: 'Password Reset Pages',
    description: 'Find password reset functionality',
    query: 'site:{DOMAIN} inurl:reset | inurl:forgot | inurl:password',
    category: 'authentication',
    severity: 'low',
    tags: ['password', 'reset'],
  },
  {
    id: 'auth-004',
    title: 'API Keys in URLs',
    description: 'Find API keys exposed in URLs',
    query: 'site:{DOMAIN} inurl:api_key | inurl:apikey | inurl:key=',
    category: 'authentication',
    severity: 'critical',
    tags: ['api-keys', 'credentials'],
  },

  // CMS PLATFORMS - WordPress
  {
    id: 'cms-wp-001',
    title: 'WordPress Version',
    description: 'Identify WordPress version information',
    query: 'site:{DOMAIN} inurl:wp-includes | inurl:wp-content',
    category: 'cms-platforms',
    severity: 'info',
    platform: 'WordPress',
    tags: ['wordpress', 'version', 'fingerprint'],
  },
  {
    id: 'cms-wp-002',
    title: 'WordPress Admin',
    description: 'Find WordPress admin login page',
    query: 'site:{DOMAIN} inurl:wp-admin | inurl:wp-login.php',
    category: 'cms-platforms',
    severity: 'info',
    platform: 'WordPress',
    tags: ['wordpress', 'admin', 'login'],
  },
  {
    id: 'cms-wp-003',
    title: 'WordPress Uploads',
    description: 'Discover WordPress uploads directory',
    query: 'site:{DOMAIN} inurl:wp-content/uploads',
    category: 'cms-platforms',
    severity: 'low',
    platform: 'WordPress',
    tags: ['wordpress', 'uploads', 'files'],
  },
  {
    id: 'cms-wp-004',
    title: 'WordPress Plugins',
    description: 'List installed WordPress plugins',
    query: 'site:{DOMAIN} inurl:wp-content/plugins',
    category: 'cms-platforms',
    severity: 'info',
    platform: 'WordPress',
    tags: ['wordpress', 'plugins'],
  },

  // CMS PLATFORMS - Drupal
  {
    id: 'cms-dr-001',
    title: 'Drupal Version',
    description: 'Identify Drupal installation and version',
    query: 'site:{DOMAIN} intext:"Drupal" | inurl:"/node"',
    category: 'cms-platforms',
    severity: 'info',
    platform: 'Drupal',
    tags: ['drupal', 'version'],
  },

  // CMS PLATFORMS - Joomla
  {
    id: 'cms-jm-001',
    title: 'Joomla Detection',
    description: 'Detect Joomla CMS installations',
    query: 'site:{DOMAIN} inurl:"/administrator" | inurl:"/components/com_"',
    category: 'cms-platforms',
    severity: 'info',
    platform: 'Joomla',
    tags: ['joomla', 'cms'],
  },

  // DATABASES
  {
    id: 'db-001',
    title: 'PhpMyAdmin',
    description: 'Find phpMyAdmin installations',
    query: 'site:{DOMAIN} inurl:phpmyadmin | inurl:pma',
    category: 'databases',
    severity: 'high',
    tags: ['phpmyadmin', 'mysql', 'database'],
  },
  {
    id: 'db-002',
    title: 'MongoDB Exposed',
    description: 'Locate exposed MongoDB interfaces',
    query: 'site:{DOMAIN} inurl:27017 | intext:"mongodb"',
    category: 'databases',
    severity: 'critical',
    tags: ['mongodb', 'database', 'nosql'],
  },
  {
    id: 'db-003',
    title: 'Elasticsearch',
    description: 'Find exposed Elasticsearch instances',
    query: 'site:{DOMAIN} inurl:9200 | intext:"elasticsearch"',
    category: 'databases',
    severity: 'high',
    tags: ['elasticsearch', 'database'],
  },

  // NETWORK DEVICES
  {
    id: 'net-001',
    title: 'Router Interfaces',
    description: 'Find exposed router admin interfaces',
    query: 'site:{DOMAIN} intitle:"router" | intitle:"gateway"',
    category: 'network-devices',
    severity: 'medium',
    tags: ['router', 'network', 'admin'],
  },
  {
    id: 'net-002',
    title: 'Webcams',
    description: 'Locate exposed webcam interfaces',
    query: 'site:{DOMAIN} inurl:"/view/index.shtml" | inurl:"/view/view.shtml"',
    category: 'network-devices',
    severity: 'medium',
    tags: ['webcam', 'camera', 'surveillance'],
  },

  // SENSITIVE DATA
  {
    id: 'sd-001',
    title: 'Email Addresses',
    description: 'Harvest email addresses from the domain',
    query: 'site:{DOMAIN} intext:"@{DOMAIN}" | intext:"email"',
    category: 'sensitive-data',
    severity: 'info',
    tags: ['email', 'contact', 'osint'],
  },
  {
    id: 'sd-002',
    title: 'Private Keys',
    description: 'Find exposed private keys',
    query: 'site:{DOMAIN} ext:pem | ext:key | ext:ppk "PRIVATE KEY"',
    category: 'sensitive-data',
    severity: 'critical',
    tags: ['keys', 'certificates', 'credentials'],
  },
  {
    id: 'sd-003',
    title: 'Internal IP Addresses',
    description: 'Discover internal IP addresses in documents',
    query: 'site:{DOMAIN} intext:"10." | intext:"192.168" | intext:"172.16"',
    category: 'sensitive-data',
    severity: 'low',
    tags: ['ip-addresses', 'network', 'internal'],
  },
  {
    id: 'sd-004',
    title: 'Financial Information',
    description: 'Find documents with financial data',
    query: 'site:{DOMAIN} intext:"invoice" | intext:"payment" | intext:"credit card"',
    category: 'sensitive-data',
    severity: 'high',
    tags: ['financial', 'pii', 'sensitive'],
  },
];

export const getCategoryCounts = () => {
  return dorks.reduce((acc, dork) => {
    acc[dork.category] = (acc[dork.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getSeverityCounts = () => {
  return dorks.reduce((acc, dork) => {
    acc[dork.severity] = (acc[dork.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getDorksByCategory = (category: string) => {
  return dorks.filter((dork) => dork.category === category);
};

export const getDorksBySeverity = (severity: string) => {
  return dorks.filter((dork) => dork.severity === severity);
};

export const searchDorks = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return dorks.filter(
    (dork) =>
      dork.title.toLowerCase().includes(lowerQuery) ||
      dork.description.toLowerCase().includes(lowerQuery) ||
      dork.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
