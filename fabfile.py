from fabric.api import (sudo, local)


def _docker_login(user, password, domain):
    sudo('docker login --username=%s --password=%s %s' % (user,
                                                          password,
                                                          domain))


def _docker_logout(domain):
    sudo('docker logout %s' % (domain))


def build_meteor_branch(branch_name, release='1.3.3'):
    local('meteor --release %s build build' % (release))
