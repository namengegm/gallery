pipeline { 
  agent any
  tools { 
    gradle "Gradle-6"
  }
  stages { 
    stage('clone repository') {
      steps { 
        git 'git@github.com:namengegm/gallery.git'
      }
    }
    stage('Build the project') {
      steps { 
        sh 'gradle build'
      }
    }
    stage('Tests') {
      steps { 
        sh 'gradle test'
      }
    }
  }
}






