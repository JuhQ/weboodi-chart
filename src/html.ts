import { DOMParams } from './interfaces/Interfaces';

const html = ({
  duplikaattiKurssit,
  perusOpinnot,
  aineOpinnot,
  pääaine = '',
  sivuaineet,
}: DOMParams) => `
  <div id="nuggets" class="margin-bottom-large">
    <div class="clear margin-bottom-small">
      <div id="perusopinnot-container" class="jeejee-pull-left" style="display:none;">
        Perusopinnot <span id="perusopinnot-progress"></span>
        <canvas id="perusopinnot" width="500" height="200"></canvas>
      </div>
      <div id="aineopinnot-container" class="jeejee-pull-left" style="display:none;">
        Aineopinnot <span id="aineopinnot-progress"></span>
        <canvas id="aineopinnot" width="500" height="200"></canvas>
      </div>
    </div>
    <div class="clear">
      <div class="jeejee-pull-left half">
        <canvas id="chart-nopat" width="500" height="200"></canvas>
      </div>
      <div class="jeejee-pull-left half">
        <canvas id="chart-keskiarvo" width="500" height="200"></canvas>
      </div>
    </div>
    <div class="clear">
      <div class="jeejee-pull-left half">
        <canvas id="chart-nopat-kuukaudet" width="500" height="200"></canvas>
      </div>
      <div class="jeejee-pull-left half">
        <div id="opintojen-maara"></div>
        <div id="keskiarvo-op-maara"></div>
        <div id="luennoitsijoiden-maara"></div>
        <div id="open-uni-maara"></div>
        <div id="hyv-maara"></div>
        <div id="vuodet-arvio"></div>
        <div id="tunnit-arvio"></div>
        <div id="max-kuukausi-nopat"></div>
        <div id="keskiarvo"></div>
        <div id="pääaine-data"></div>
        <div id="sivuaineet-data"></div>
        <div id="tagipilvi"></div>
      </div>
    </div>
    <div class="clear">
      <div class="jeejee-pull-left half">
        <canvas id="chart-nopat-vuosi" width="500" height="200"></canvas>
        <canvas id="chart-laitos-graafit" width="500" height="200"></canvas>
      </div>
      <div class="jeejee-pull-left half">
        <canvas id="chart-arvosanat-groupattuna" width="500" height="200"></canvas>
        <canvas id="chart-nopat-groupattuna" width="500" height="200"></canvas>
      </div>
    </div>

    <div id="luennoitsijat"></div>
    <div id="tools" class="margin-bottom-large">
      <p>
        <label style="margin-bottom:30px;">
          Merkitse tähän listaan pilkulla erottaen kurssit joita et halua sisällyttää laskelmointiin (esimerkiksi duplikaattikurssit). Esimerkki: A582103,A581325<br/>
          <input type="text" name="duplikaattiKurssit" value="${duplikaattiKurssit}" />
        </label>
      </p>

      <p>
        <label style="margin-bottom:30px;">
          Merkitse tähän listaan pilkulla erottaen pääaineesi perusopinnot. Esimerkki: A582103,A581325<br/>
          <input type="text" name="perusOpinnot" value="${perusOpinnot}" />
        </label>
      </p>

      <p>
        <label style="margin-bottom:30px;">
          Merkitse tähän listaan pilkulla erottaen pääaineesi aineopinnot. Esimerkki: A582103,A581325<br/>
          <input type="text" name="aineOpinnot" value="${aineOpinnot}" />
        </label>
      </p>

      <p>
        <label style="margin-bottom:30px;">
          Merkitse tähän pääaineesi lyhenne. Esimerkki: TKT<br/>
          <input type="text" name="pääaine" value="${pääaine}" />
        </label>
      </p>

      <p>
        <label style="margin-bottom:30px;">
          Merkitse tähän listaan pilkulla erottaen sivuaineesi lyhenteet. Esimerkki: TKT,MAT<br/>
          <input type="text" name="sivuaineet" value="${sivuaineet.join(
            ',',
          )}" />
        </label>
      </p>

      <p>
        <button id="kliketi-klik">
          Klikkaamalla tästä voit päivittää graafit manuaalisesti
        </button>
      </p>

      <p>
        <button id="kliketi-klik-esitäyttö-2017">
          Esitäytä perus- ja aineopinnot tkt kandiopinnoilla (2017 &ge; ) huom: sisältää myös avoimen ja vanhan malliset lyhenteet
        </button>
      </p>

      <p>
        <button id="kliketi-klik-esitäyttö-pre-2017">
          Esitäytä perus- ja aineopinnot tkt kandiopinnoilla (&le; 2016) huom: sisältää myös avoimen ja vanhan malliset lyhenteet
        </button>
      </p>
    </div>

    <p>
      Haluatko lisätoiminnallisuutta tähän plugariin? Löysitkö virheen?<br>
      Mikäli olet tkt opiskelija, <a href="https://github.com/JuhQ/weboodi-chart">tee pull request</a>.<br>
      Mikäli opiskelet jotain muuta, laita mailia <a href="mailto:juha.tauriainen@helsinki.fi">juha.tauriainen@helsinki.fi</a>
    </p>

    <p>
      Plugin löytyy googlen webstoresta <a href="https://chrome.google.com/webstore/detail/weboodi-charts/mmjejalobgipeicnedjpcnjkeamamlnd">https://chrome.google.com/webstore/detail/weboodi-charts/mmjejalobgipeicnedjpcnjkeamamlnd</a><br>
      Lyhytosoite <a href="https://goo.gl/TrpRJr">https://goo.gl/TrpRJr</a><br>
      <a href="https://github.com/JuhQ/weboodi-chart">GitHub repositorio</a><br>
      <a href="https://addons.mozilla.org/en-US/firefox/addon/weboodi-charts/">Firefox plugin</a>
    </p>
  </div>
  `;

export default html;
