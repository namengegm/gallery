pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22.4.0' // Use the name you configured in the Global Tool Configuration
    }
   

    triggers { environment {
        RENDER_APP_NAME = 'gallery' // Replace with your Render application name
        RENDER_LINK = 'https://gallery-95mu.onrender.com/' // Replace with your Render application link
        SLACK_CHANNEL = 'ianip1' // Replace with your Slack channel
        SLACK_CREDENTIALS_ID = '7UT8vmhodgwdjeDPLPyd4RI3' // Ensure this matches your Jenkins credentials ID
        EMAIL_RECIPIENT = 'mbuguaian32@gmail.com' // Replace with your email recipient or ensure it's set in Jenkins
    }
        pollSCM('H/2 * * * *') // Polls the SCM every 2 minutes
    }

    stages {
        stage("Clone gallery repository") {
            steps {
                git branch: 'master', url: 'https://github.com/namengegm/gallery.git'
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    try {
                        sh 'npm install'
                    } catch (Exception e) {
                        error "Failed to install dependencies: ${e.message}"
                    }
                }
            }
        }

        stage('Test project') {
            steps {
                script {
                    try {
                        echo 'Running tests...'
                        sh 'npm test'
                    } catch (Exception e) {
                        error "Tests failed: ${e.message}"
                    }
                }
            }
        }

        stage('Build project') {
            steps {
                script {
                    try {
                        echo 'Building project...'
                        sh 'npm run build'
                    } catch (Exception e) {
                        error "Build failed: ${e.message}"
                    }
                }
            }
        }

        stage('Start server') {
            steps {
                script {
                    try {
                        echo 'Starting server...'
                        sh 'npm start &'
                        sleep 10 // Give time for the server to start
                    } catch (Exception e) {
                        error "Failed to start server: ${e.message}"
                    }
                }
            }
        }

    }
    
    }


    