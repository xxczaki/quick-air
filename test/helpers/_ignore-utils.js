import requireHacker from 'require-hacker';

requireHacker.hook('svg', () => 'module.exports = ""');
