# GLPI Security Audit

## Overview

GLPI (Gestionnaire Libre de Parc Informatique) is an open-source IT asset management and ticketing solution that can be vulnerable to various attacks. As a central component of many IT infrastructures, it's a frequent target for attackers, with numerous CVEs regularly published.

> This guide is based on [IT-Connect's article on GLPI security auditing](https://www.it-connect.fr/audit-securite-glpi-recherche-vulnerabilites/) by Mickael Dorigny.

## Security Importance

GLPI represents a significant security risk for several reasons:

- **Sensitive data storage**: User tickets often contain technical information, login credentials, and sometimes passwords in plaintext
- **IT infrastructure mapping**: Provides attackers with a complete inventory of networks, servers, workstations, and installed software
- **Authentication information**: Contains sensitive configuration parameters including Active Directory credentials and email service authentication
- **Large attack surface**: Used by most IT users, making it an ideal vector for widespread attacks

## GLPwnMe: GLPI Audit Tool

GLPwnMe is a Python-based security tool developed and maintained by Orange Cyberdefense teams. It offers various options for auditing and exploiting vulnerabilities in GLPI instances.

### Installation

On a Linux system with Python and pipx:

```bash
# Install glpwnme via pipx
pipx install git+https://github.com/Orange-Cyberdefense/glpwnme
```

### Basic Security Audit

#### Check for CVEs (unauthenticated)

```bash
# Run a complete safe scan
glpwnme -t http://glpi-address --check-all
```

This command performs:

- Version and operating system identification
- Installation directory detection
- Known CVE verification based on version
- Checks that can be performed without credentials

#### Default Credentials Check

```bash
# Check for default GLPI credentials
glpwnme -t http://glpi-address --run --exploit DEFAULT_PASSWORD_CHECK
```

This verifies if default accounts (`glpi`, `tech`, `normal`, `post-only`) are still active with their original passwords.

#### Authenticated Audit

```bash
# Perform an authenticated audit
glpwnme -t http://glpi-address --check-all -u username -p password
```

This approach detects vulnerabilities that require authentication to be exploited.

#### Comprehensive Audit (potentially intrusive)

```bash
# Without authentication
glpwnme -t http://glpi-address --check-all --no-opsec

# With admin account
glpwnme -t http://glpi-address --check-all -u username -p password --no-opsec
```

The `--no-opsec` option enables more thorough checks but may cause changes to the GLPI instance (file uploads, user creation, etc.).

#### Exploit Documentation

```bash
# Display documentation for an exploit
glpwnme -t http://glpi-address -e <EXPLOIT_NAME> --infos
```

### Vulnerability Exploitation Example

```bash
# Exploit a vulnerability
glpwnme -t http://glpi-address --run -e CVE_XXXX_XXXXX -u username -p password
```

For example, CVE-2024-27937 allows any authenticated user to read any field in the GLPI database, including passwords and sensitive parameters.

## Security Best Practices

To effectively secure your GLPI instance:

1. **Regular updates**: Apply security patches promptly for GLPI, its plugins, and the host operating system
2. **HTTPS**: Use TLS encryption for all communications
3. **Change default credentials**: Modify all default accounts after deployment or updates
4. **Web Application Firewall**: Deploy WAF protection to identify and block basic malicious requests
5. **Logging**: Configure log forwarding to a SIEM/XDR for early detection
6. **Regular audits**: Use GLPwnMe periodically to verify vulnerability absence
7. **Access restrictions**: Limit administrative rights and review permissions regularly
8. **Data cleanup**: Regularly purge old tickets and their attachments
9. **User awareness**: Train users on security best practices, especially password strength and not sharing sensitive information in tickets

## Resources

- [GLPwnMe GitHub repository](https://github.com/Orange-Cyberdefense/glpwnme)
- [GLPI vulnerability research blog](https://borelenzo.github.io/stuff/2024/02/29/glpi-pwned.html)
- [IT-Connect: GLPI security audit guide](https://www.it-connect.fr/audit-securite-glpi-recherche-vulnerabilites/)
- [ANSSI recommendations on web application security](https://cyber.gouv.fr/publications/securiser-un-site-web)
