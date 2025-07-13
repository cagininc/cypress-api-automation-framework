# Cypress API Otomasyon Framework

Bu proje, Cypress ve Allure Report kullanarak Swagger PetStore API'sinin temel uç noktaları (Pet, User, Store) için otomasyon testleri gerçekleştirir.
---

## 🚀 Özellikler

- **Kapsamlı API Testleri**: Pet, User ve Store API'leri için CRUD senaryoları.
- **CRUD İşlemleri**:
  - Yeni evcil hayvan ve kullanıcı oluşturma
  - Mevcut veriyi okuma, güncelleme ve silme
- **Sipariş Yönetimi**: PetStore üzerinden sipariş oluşturma, sorgulama ve silme.
- **Envanter Kontrolü**: Mağaza envanterini durum bazında (available, pending, sold) alma.
- **Resim Yükleme**: Evcil hayvana resim yükleme senaryoları.
- **Allure Report Entegrasyonu**:
  - Temiz ve etkileşimli HTML raporlar
  - Test adımlarını, ekran görüntülerini ve logları bir arada gösterme

## API Uç Noktaları

### Pet API Endpoints
- `POST /pet` : Yeni evcil hayvan oluşturma
- `GET /pet/{petId}` : ID ile evcil hayvan bilgilerini alma
- `PUT /pet` : Mevcut evcil hayvanı güncelleme
- `DELETE /pet/{petId}` : ID ile evcil hayvan silme
- `GET /pet/findByStatus` : Duruma göre evcil hayvanları listeleme (available, pending, sold)
- `POST /pet/{petId}/uploadImage` : Evcil hayvana resim yükleme

### User API Endpoints
- `POST /user` : Yeni kullanıcı oluşturma
- `GET /user/{username}` : Kullanıcı adı ile kullanıcı bilgisi alma
- `PUT /user/{username}` : Mevcut kullanıcıyı güncelleme
- `DELETE /user/{username}` : Kullanıcı silme
- `GET /user/login` : Geçerli kimlik bilgileriyle kullanıcı girişi
- `GET /user/logout` : Kullanıcı çıkış işlemi

### Store API Endpoints
- `POST /store/order` : Yeni sipariş oluşturma
- `GET /store/order/{orderId}` : Siparişi ID ile alma
- `DELETE /store/order/{orderId}` : Siparişi silme
- `GET /store/inventory` : Mağaza envanterini durum bazında listeleme

## 🛠️ Kullanılan Teknolojiler

- [Cypress](https://www.cypress.io/)
- [Allure Report](https://docs.qameta.io/allure/)
- Node.js & npm

## 📦 Kurulum

```bash
# Projeyi klonla
git clone https://github.com/cagininc/cypress-api-automation-framework.git
cd cypress-api-automation-framework

# Gerekli paketleri yükle
npm install
