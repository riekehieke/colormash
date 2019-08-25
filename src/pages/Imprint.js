import { BasePage } from './BasePage.js'

const imprintText = `Erstellt von
Jonas Kuske – https://jonaskuske.com
Rieke Helmers – https://riekehelmers.com
Max M. Schneider – https://maxmschneider.com

© 2019

Song Flamingo-8bit von Mooph
https://www.youtube.com/channel/UCdYvD9C-0yTlmx3hc67bVFQ

-

angaben gemäß § 5 tmg

jonas Kuske
sielstraße 5
27568 Bremerhaven

kontakt
e-mail: mail@jonaskuske.com
website: https://www.jonaskuske.com

haftungsausschluss

haftung für inhalte
die inhalte der seite wurden mit größter sorgfalt erstellt.
für die richtigkeit, vollständigkeit und aktualität der inhalte kann jedoch
keine gewähr übernommen werden. als diensteanbieter bin ich gemäß
§ 7 abs.1 tmg für eigene inhalte auf diesen seiten nach den allgemeinen gesetzen
verantwortlich. nach §§ 8 bis 10 tmg bin ich als diensteanbieter jedoch nicht
verpflichtetübermittelte oder gespeicherte fremde informationen zu überwachen oder
nach umständen zu forschen, die auf eine rechtswidrige tätigkeit hinweisen.
verpflichtungen zur entfernung oder sperrung der nutzung von informationen nach den
allgemeinen gesetzen bleiben hiervon unberührt. eine diesbezügliche haftung ist
jedoch erst ab dem zeitpunkt der kenntnis einer konkreten rechtsverletzung möglich.
bei bekanntwerden von entsprechenden rechtsverletzungen werde ich diese inhalte
umgehend entfernen.

haftung für links
die seiten enthalten links zu externen webseiten dritter, auf deren inhalte ich
keinen einfluss habe. deshalb kann ich für diese fremden inhalte auch keine gewähr
übernehmen. für die inhalte der verlinkten seiten ist stets der jeweilige anbieter
oder betreiber der seiten verantwortlich. die verlinkten seiten wurden zum zeitpunkt
der verlinkung auf mögliche rechtsverstöße überprüft. rechtswidrige inhalte waren zum
zeitpunkt der verlinkung nicht erkennbar. eine permanente inhaltliche kontrolle der
verlinkten seiten ist jedoch ohne konkrete anhaltspunkte einer rechtsverletzung nicht
zumutbar. bei bekanntwerden von rechtsverletzungen werde ich derartige links umgehend
entfernen.

urheberrecht
die durch die seitenbetreiber erstellten bzw. verwendeten inhalte und werke auf diesen
seiten unterliegen dem deutschen urheberrecht. die vervielfältigung, bearbeitung,
verbreitung und jede art der verwertung außerhalb der grenzen des urheberrechtes
bedürfen der zustimmung des jeweiligen autors bzw. erstellers. downloads und kopien
dieser seite sind nur für den privaten, nicht kommerziellen gebrauch gestattet.
soweit die inhalte auf dieser seite nicht vom betreiber erstellt wurden, werden
die urheberrechte dritter beachtet. insbesondere werden inhalte dritter als solche
gekennzeichnet. sollten sie trotzdem auf eine urheberrechtsverletzung aufmerksam werden,
bitte ich um einen entsprechenden hinweis. bei bekanntwerden von rechtsverletzungen
werde ich derartige inhalte umgehend entfernen. `

export class Imprint extends BasePage {
  constructor() {
    super()
    // Da man den Text scrollen kann: speichern um wie viel Pixel auf der y-Achse gescrollt wurde
    this.textOffsetY = 0
  }

  draw() {
    // Überschrift
    noStroke()
    fill(255)
    textSize(30)
    textAlign(CENTER, TOP)
    text('IMPRINT', width / 2, 100 + this.textOffsetY)

    // Impressumstext
    textSize(10)
    textLeading(19)
    textAlign(CENTER, TOP)
    text(imprintText.toUpperCase(), width / 2, 180 + this.textOffsetY)
  }

  onKeyPress() {
    // Bei Pfeiltaste hoch/runter den Text-Offset anpassen, damit man "scrollen" kann
    switch (keyCode) {
      case DOWN_ARROW:
        this.textOffsetY -= 40
        break
      case UP_ARROW:
        // Falls Orginalposition des Textes erreicht: nicht weiter scrollen
        if (this.textOffsetY + 40 >= 0) this.textOffsetY = 0
        else this.textOffsetY += 40
        break
    }
  }
}
