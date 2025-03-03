pipeline {
    agent {
        docker { 
            image 'cypress/browsers:latest' 
            args '-u root --networkd rockshaver_skynet'
            }
    }
    stages {
        stage('Testes de API') {
            steps {
                dir('api') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run'
                }
            }
        }

        stage('Testes no Frontend (Mobile)'){
            steps {
                dir('mobile') {
                    sh 'echo teste'
                }
            }
        }

        stage('Testes no Frontend (Web)'){
            steps {
                dir('web') {
                    sh 'echo teste'
                }
            }
        }
    }
}