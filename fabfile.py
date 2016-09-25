from fabric.api import (sudo, local)
from fabric.context_managers import lcd, shell_env


def _docker_login(user, password, domain):
    sudo('docker login --username=%s --password=%s %s' % (user,
                                                          password,
                                                          domain))


def _docker_logout(domain):
    sudo('docker logout %s' % (domain))


def build_meteor_branch(branch_name, app_type, release='1.3.3'):
    with lcd('apps/%s' % (app_type)), shell_env(PACKAGE_DIRS='packages'):
        local('meteor --release %s build build' % (release))
