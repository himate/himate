from fabric.api import (sudo, put, local, run)
from fabric.context_managers import (lcd, shell_env)


BUILD_DIR = 'cur_build'


def _docker_login(user, password, domain):
    sudo('docker login --username=%s --password=%s %s' % (user,
                                                          password,
                                                          domain))


def _docker_logout(domain):
    sudo('docker logout %s' % (domain))


def build_branch(branch_name, app_type, release='1.3.3'):
    with lcd('apps/%s' % (app_type)), shell_env(PACKAGE_DIRS='../../packages'):
        local('meteor --release %s build ../../%s' % (release, BUILD_DIR))


def build_image(branch_name, app_type, hub, repo, hub_user, hub_pass):
    put('Dockerfile', 'Dockerfile')
    put('%s/%s.tar.gz' % (BUILD_DIR, app_type), '%s.tar.gz' % (app_type))
    run('tar -xf %s.tar.gz -C %s' % (app_type, app_type))
    sudo('docker build -t %s/%s:%s-SNAPSHOT .' % (hub, repo, branch_name))
    sudo('docker login --username="%s" --password="%s" %s' % (hub_user,
                                                              hub_pass,
                                                              hub))
    sudo('docker push %s/%s:%s-SNAPSHOT ' % (hub, repo, branch_name))
    sudo('docker logout %s' % (hub))
