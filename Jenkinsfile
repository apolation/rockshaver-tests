pipeline {
    agent {
        docker { 
            image 'cypress/browsers:node-22.14.0-chrome-133.0.6943.126-1-ff-135.0.1-edge-133.0.3065.82-1'
            args '-u root --network rockshaver_skynet'
            }
    }
    stages {
        stage('API') {
            steps {
                dir('api') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'node runner.js'
                }
            }
        }

        stage('Mobile'){
            steps {
                dir('mobile') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'node runner.js'
                }
            }
        }

        stage('Web'){
            steps {
                dir('web') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'node runner.js'
                }
            }
        }
    }
}