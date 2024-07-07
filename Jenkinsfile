pipeline { 
  agent any
    tools {
        nodejs 'NodeJS 22.4.0' // Use the name you configured in the Global Tool Configuration
    }
  triggers {
 //Query repository weekdays every four hours starting at minute 0
pollSCM('0 */4 * * 1-5')
}
}
  
  stages { 
    stage('clone repository') {
      steps { 
        gitgit branch: 'master', url: 'https://github.com/namengegm/gallery'
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

        stage('Deploy to Render') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'render_api_key', variable: 'RENDER_API_KEY')]) {
                        try {
                            sh """
                            curl -X POST -H 'Authorization: Bearer ${RENDER_API_KEY}' \
                            -H 'Content-Type: application/json' \
                            -d '{"branch": "master", "env": {"NODE_ENV": "production"}}' \
                            https://api.render.com/v1/services/${RENDER_APP_NAME}/deploy
                            """
                        } catch (Exception e) {
                            error "Deployment to Render failed: ${e.message}"
                        }
                    }
                }
            }
        }
    }
        always {
            script {
                if (currentBuild.result == 'FAILURE') {
                    emailext (
                        to: "${EMAIL_RECIPIENT}",
                        subject: "Jenkins Build Failed: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
                        body: """
                        <p>The Jenkins build <b>${env.JOB_NAME} ${env.BUILD_NUMBER}</b> has failed.</p>
                        <p>Please check the Jenkins console output for more details: ${env.BUILD_URL}</p>
                        """
                    )
                }
            }
        }

            post {
        success {
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'YOUREMAIL@gmail.com'
        }
        failure {
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: FAILURE -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'YOUREMAIL@gmail.com'
        }
}



  }
}






