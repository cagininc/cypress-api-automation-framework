pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        // 📥 Kod repodan çekiliyor...  // 📥 Checking out code from SCM
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        // 📦 Bağımlılıklar yükleniyor...  // 📦 Installing dependencies
        sh 'npm ci'
        // 🛠️ Cypress kurulumu yapılıyor...  // 🛠️ Installing Cypress
        sh 'npx cypress install'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        // 🧪 Testler çalıştırılıyor...  // 🧪 Running Cypress tests
        sh 'npx cypress run'
      }
      post {
        always {
          // 📂 Sonuçlar arşivleniyor...  // 📂 Archiving results
          junit 'cypress/results/*.xml'            // JUnit raporu (varsa)  // JUnit report (if any)
          archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true  // Ekran görüntüleri  // Screenshots
        }
      }
    }
  }
}
