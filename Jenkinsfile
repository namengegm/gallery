pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22.4.0' // Use the name you configured in the Global Tool Configuration
    }


    triggers {
        pollSCM('H/2 * * * *') // Polls the SCM every 2 minutes
    }

    stages {
        stage("Clone gallery repository") {
            steps {
                git branch: 'master', url: 'https://github.com/namengegm/gallery.git'
            }
        }
    }

        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install'
                    } 
                }
            }

        stage('Start server') {
            steps {
                script {
                        echo 'Starting server...'
                        sh 'node server'
                    }
                }
                    }
}