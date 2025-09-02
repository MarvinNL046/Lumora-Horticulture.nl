'use client'

import Image from 'next/image'

export default function EllepotFlyerPrint() {
  return (
    <div style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      backgroundColor: 'white',
      fontFamily: 'Arial, sans-serif',
      fontSize: '12pt',
      lineHeight: '1.5',
      color: '#333',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a3d1a 0%, #2d5a2d 100%)',
        color: 'white',
        padding: '30mm 25mm 25mm 25mm',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20mm'
        }}>
          <div style={{
            background: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <Image 
              src="/logo/lumura-horticulture-logo.jpeg" 
              alt="Lumora Horticulture" 
              width={120} 
              height={48}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ fontSize: '16pt', marginBottom: '4px' }}>Milieuvriendelijk</h3>
            <p style={{ fontSize: '11pt', opacity: 0.9 }}>Duurzame kweekoplossing</p>
          </div>
        </div>
        <h1 style={{ fontSize: '32pt', marginBottom: '8px', fontWeight: 'bold' }}>Ellepot® FP 12+ Papier</h1>
        <p style={{ fontSize: '18pt', opacity: 0.95 }}>Het innovatieve omhulsel voor onze steenwolpluggen</p>
      </div>

      {/* Main content */}
      <div style={{ padding: '20mm 25mm 25mm 25mm' }}>
        {/* Introduction */}
        <p style={{ 
          fontSize: '11pt', 
          marginBottom: '15mm',
          lineHeight: '1.6',
          color: '#444'
        }}>
          Al onze <strong>paperbus steenwol pluggen</strong> zijn verpakt met <strong>Ellepot FP 12+ papier</strong> – een duurzame en 
          innovatieve oplossing voor het kweken van sterke en gezonde planten. Dit speciale papier is gemaakt 
          van milieuvriendelijke houtvezels uit hernieuwbare bronnen, met een toevoeging van polyester voor 
          versterking.
        </p>

        {/* Key features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12mm',
          marginBottom: '15mm'
        }}>
          {[
            { icon: '🌱', title: 'Milieuvriendelijk', text: 'Gemaakt van houtvezels uit hernieuwbare bronnen met minimale impact op het milieu' },
            { icon: '⏰', title: '12+ Maanden Afbraaktijd', text: 'Perfect voor gewassen met een langere productietijd voordat ze uitgeplant worden' },
            { icon: '🛡️', title: 'Schimmelwerend', text: 'Voorzien van fungicide eigenschappen om jonge planten extra te beschermen' },
            { icon: '🌿', title: 'Geen Transplantatieschok', text: 'Wortels groeien moeiteloos door het papier heen zonder groeistilstand' }
          ].map((feature, index) => (
            <div key={index} style={{
              backgroundColor: '#f5f9f5',
              border: '1px solid #d4e4d4',
              borderRadius: '12px',
              padding: '12mm',
              display: 'flex',
              gap: '10mm'
            }}>
              <div style={{ fontSize: '24pt' }}>{feature.icon}</div>
              <div>
                <h3 style={{ fontSize: '13pt', marginBottom: '4mm', color: '#1a3d1a' }}>{feature.title}</h3>
                <p style={{ fontSize: '10pt', lineHeight: '1.5', color: '#666' }}>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Image */}
        <div style={{
          textAlign: 'center',
          marginBottom: '15mm'
        }}>
          <div style={{
            display: 'inline-block',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <Image
              src="/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
              alt="Ellepot FP 12+ Steenwolpluggen"
              width={400}
              height={200}
              style={{ objectFit: 'cover', display: 'block' }}
            />
          </div>
          <p style={{ fontSize: '10pt', color: '#666', marginTop: '5mm' }}>
            Lumora paperbus steenwol pluggen met Ellepot FP 12+ papier
          </p>
        </div>

        {/* Transplant shock explanation */}
        <div style={{
          backgroundColor: '#f8f8f8',
          borderRadius: '12px',
          padding: '12mm',
          marginBottom: '12mm'
        }}>
          <h3 style={{ fontSize: '14pt', marginBottom: '6mm', color: '#1a3d1a' }}>
            Wat is transplantatieschok?
          </h3>
          <p style={{ fontSize: '10pt', lineHeight: '1.6', color: '#555' }}>
            Bij het verplanten van jonge planten raken wortels vaak beschadigd. Hierdoor stopt de plant 
            tijdelijk met groeien of ziet hij er slap uit. Met onze paperbus steenwol pluggen in Ellepot FP 12+ 
            papier gebeurt dit niet: de wortels groeien moeiteloos door het papier heen, zodat je planten 
            sterk en gezond verder groeien.
          </p>
        </div>

        {/* Applications */}
        <div>
          <h3 style={{ fontSize: '14pt', marginBottom: '8mm', color: '#1a3d1a' }}>
            Perfect geschikt voor:
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4mm 15mm'
          }}>
            {[
              'Groente- en kruidenkwekerijen',
              'Sierteelt',
              'Boomkwekerijen',
              'Hobby- en moestuiniers'
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6mm' }}>
                <span style={{ color: '#2d5a2d', fontSize: '14pt' }}>✓</span>
                <span style={{ fontSize: '10pt' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1a3d1a',
        color: 'white',
        padding: '20mm 25mm',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <div>
          <h3 style={{ fontSize: '16pt', marginBottom: '8mm' }}>Neem contact met ons op</h3>
          <div style={{ fontSize: '10pt', lineHeight: '2' }}>
            <p style={{ margin: '0 0 2mm 0' }}>✉ info@lumorahorticulture.com</p>
            <p style={{ margin: '0 0 2mm 0' }}>🌐 lumorahorticulture.nl</p>
            <p style={{ margin: '0' }}>📱 +31 6 38382564</p>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '9pt', marginBottom: '4mm', opacity: 0.8 }}>Scan voor meer info</p>
          <div style={{
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '6px',
            display: 'inline-block'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8pt',
              color: '#999'
            }}>
              [QR Code]
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}