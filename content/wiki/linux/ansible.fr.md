# Ansible

## Configuration

### Fichier d'inventaire

Créez un fichier d'inventaire pour définir les hôtes et les groupes d'hôtes à gérer.

```ini
# filepath: /etc/ansible/hosts
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
db2.example.com
```

### Fichier de configuration d'Ansible

Créez un fichier de configuration d'Ansible pour définir les options globales.

```ini
# filepath: /etc/ansible/ansible.cfg
[defaults]
inventory = /etc/ansible/hosts
remote_user = ansible
host_key_checking = False
```

## Commandes de base

### Envoyer un ping à tous les hôtes

```bash
ansible all -m ping
```

### Exécuter une commande sur tous les hôtes

```bash
ansible all -a "/bin/echo hello"
```

### Exécuter une commande sur un groupe précis

```bash
ansible webservers -a "/bin/echo hello"
```

## Playbooks

### Playbook de base

Créez un playbook pour automatiser des tâches.

```yaml
# filepath: /etc/ansible/playbooks/example.yml
- hosts: webservers
  tasks:
    - name: Ensure Apache is installed
      apt:
        name: apache2
        state: present
      become: yes

    - name: Ensure Apache is running
      service:
        name: apache2
        state: started
        enabled: yes
      become: yes
```

### Exécuter un playbook

```bash
ansible-playbook /etc/ansible/playbooks/example.yml
```

## Modules utiles

### Gestion des paquets

```yaml
- name: Install a package
  apt:
    name: package_name
    state: present
  become: yes
```

### Gestion des services

```yaml
- name: Start a service
  service:
    name: service_name
    state: started
    enabled: yes
  become: yes
```

### Gestion des fichiers

```yaml
- name: Create a directory
  file:
    path: /path/to/directory
    state: directory
    mode: "0755"
  become: yes
```
