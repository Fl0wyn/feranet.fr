# Ansible

## Configuration

### Inventory File

Create an inventory file to define the hosts and groups of hosts to manage.

```ini
# filepath: /etc/ansible/hosts
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
db2.example.com
```

### Ansible Configuration File

Create an Ansible configuration file to set global options.

```ini
# filepath: /etc/ansible/ansible.cfg
[defaults]
inventory = /etc/ansible/hosts
remote_user = ansible
host_key_checking = False
```

## Basic Commands

### Ping All Hosts

```bash
ansible all -m ping
```

### Run a Command on All Hosts

```bash
ansible all -a "/bin/echo hello"
```

### Run a Command on a Specific Group

```bash
ansible webservers -a "/bin/echo hello"
```

## Playbooks

### Basic Playbook

Create a playbook to automate tasks.

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

### Run a Playbook

```bash
ansible-playbook /etc/ansible/playbooks/example.yml
```

## Useful Modules

### Package Management

```yaml
- name: Install a package
  apt:
    name: package_name
    state: present
  become: yes
```

### Service Management

```yaml
- name: Start a service
  service:
    name: service_name
    state: started
    enabled: yes
  become: yes
```

### File Management

```yaml
- name: Create a directory
  file:
    path: /path/to/directory
    state: directory
    mode: "0755"
  become: yes
```
