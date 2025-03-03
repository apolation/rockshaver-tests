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
                    sh 'npx cypress run --browser chrome --record --key a4f6d5bd-0d51-441d-9071-0d4f21104964'
                }
            }
        }

        stage('Mobile'){
            steps {
                dir('mobile') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run --browser chrome --record --key 197206f5-d333-49e4-bedc-a4bd87ebc485'
                }
            }
        }

        stage('Web'){
            steps {
                dir('web') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run --browser chrome --record --key 65ccb0fd-65f4-4d3b-872b-80f01f850561'
                }
            }
        }
    }
}