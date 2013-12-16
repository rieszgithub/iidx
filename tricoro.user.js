// ==UserScript==
// @name          tricoro play data in one page
// @include       http://p.eagate.573.jp/game/2dx/20/p/djdata/music.html*
// @include       http://p.eagate.573.jp/game/2dx/20/p/djdata/music_recently.html*
// @include       http://mainte.eagate.573.jp/gate/per_mainte_p.html#musiclist
// @copyright     https://twitter.com/riesz
// @license       New BSD License
// ==/UserScript==

(function() {
  var VERSION_NAMES = {
      0: "1st&substream",
      1: "2nd style",
      2: "3rd style",
      3: "4th style",
      4: "5th style",
      5: "6th style",
      6: "7th style",
      7: "8th style",
      8: "9th style",
      9: "10th style",
      10: "IIDX RED",
      11: "HAPPY SKY",
      12: "DistorteD",
      13: "GOLD",
      14: "DJ TROOPERS",
      15: "EMPRESS",
      16: "SIRIUS",
      17: "Resort Anthem",
      18: "Lincle",
      19: "tricoro"
  };

  // This music name -> star map is extracted from @nob_m_IIDX's
  // Score Viewer for beatmania IIDX 20 tricoro ver 5.1.6.
  var STAR_MAP = {"5.1.1.":[1,6,10,1,7,10],"GRADIUSIC CYBER":[5,6,7,4,9,9],"R3":[4,5,6,4,6,8],"Macho Gang":[2,7,10,3,11,11],"THE EARTH LIGHT":[4,7,8,5,10,7],"GAMBOL":[1,1,0,1,1,0],"GENOM SCREAMS":[3,6,9,3,6,9],"22DUNK":[3,4,5,5,5,5],"Dr.LOVE":[2,3,3,3,4,0],"BRILLIANT 2U":[3,4,4,3,5,0],"deep in you":[3,3,5,3,4,7],"RUGGED ASH":[2,3,9,3,4,9],"KEEP ON MOVIN'":[1,3,0,2,3,0],"PARANOIA MAX～DIRTY MIX～":[5,6,8,3,6,9],".59":[4,6,7,4,6,7],"Dancin' Into The Night":[2,3,0,2,3,0],"Digital MinD(A/T Libra mix)":[3,5,6,4,8,0],"Electro Tuned(the SubS mix)":[4,5,6,6,9,0],"I Was The One":[2,3,3,1,2,0],"Indigo Vision(full flavour hide around mix)":[3,5,8,5,8,0],"SP-TRIP MACHINE(for beatmania II)":[3,4,4,3,5,0],"PUT YOUR FAITH IN ME(for beatmania II)":[3,6,0,4,7,0],"CAN'T STOP FALLIN'IN LOVE":[3,8,0,4,7,0],"Don't Stop!":[4,4,4,4,4,0],"era (nostalmix)":[5,8,9,5,12,12],"Holic":[5,7,11,7,10,12],"LEADING CYBER":[4,6,7,4,6,6],"Presto":[3,8,8,3,8,0],"R5":[5,8,11,5,8,11],"REINCARNATION":[4,5,7,4,5,7],"Schlagwerk":[4,6,8,4,11,11],"Skyscraper":[4,6,7,4,7,0],"Tangerine Stream":[1,2,0,1,2,0],"THE SAFARI":[7,10,0,8,10,0],"250bpm":[5,8,10,4,7,9],"ABSOLUTE":[6,8,10,6,8,11],"B4U":[5,9,10,6,8,0],"Broken My Heart":[5,7,9,4,7,10],"CHECKING YOU OUT":[7,9,11,7,11,11],"Clione":[4,5,9,3,4,9],"DXY!":[6,9,10,6,12,12],"empathy":[5,7,8,4,11,0],"era (step mix)":[5,8,9,4,8,12],"HIGHER":[3,4,6,4,6,7],"KAMIKAZE":[5,6,10,5,7,10],"LOVE WILL・・・":[3,4,7,4,6,8],"minimalian":[3,8,9,3,9,12],"Mr.T.(take me higher)":[3,4,10,4,5,10],"starmine":[5,8,9,5,8,12],"Voltage (feat. Hidemaru)":[5,7,8,5,11,0],"Hitch Hiker2":[4,6,7,5,9,0],"ULTRA HIGH-HEELS":[4,5,5,4,5,0],"Burnin' The Floor":[3,4,7,3,4,8],"Nasty!":[2,4,9,5,9,0],"Under Construction":[5,7,8,5,7,8],"FLOWERS for ALBION":[2,5,0,5,7,0],"Jam&Marmalade":[6,7,8,4,6,0],"Abyss":[5,7,8,7,8,9],"in my eyes":[5,6,7,5,8,10],"Kiss me all night long":[5,6,7,5,6,7],"outer wall":[5,6,8,5,7,10],"QQQ":[5,8,10,10,12,0],"Radical Faith":[5,6,7,6,11,10],"Real":[5,8,9,7,9,11],"Regulus":[6,9,10,6,10,11],"RIDE ON THE LIGHT (HI GREAT MIX)":[4,5,8,5,8,9],"RISLIM":[4,7,0,4,6,0],"Spin the disc":[5,7,8,7,10,0],"STILL IN MY HEART":[5,7,9,4,6,11],"still my words":[4,6,0,5,7,0],"sync":[6,8,10,7,9,11],"V":[5,10,12,6,10,11],"sometime":[4,5,7,5,8,0],"THE CUBE":[4,6,7,4,6,11],"LOVE AGAIN TONIGHT～for Mellisa mix～":[4,5,6,4,5,0],"INSERTiON":[5,7,8,5,7,8],"THE SHINING POLARIS":[5,7,8,6,8,0],"BALLAD FOR YOU～想いの雨～":[3,5,7,5,8,0],"Blueberry Stream":[5,7,8,7,9,10],"Buffalo":[5,7,10,4,8,10],"Colors (radio edit)":[6,9,12,6,10,12],"DIVE ～INTO YOUR HEART～":[5,8,10,5,8,10],"fly through the night":[4,7,8,4,8,10],"Free Style":[5,6,7,6,6,0],"Frozen Ray (original mix)":[6,9,9,5,9,9],"G2":[8,9,11,6,7,12],"Linus":[5,9,11,5,9,11],"NEMESIS":[5,9,11,7,10,12],"rottel-da-sun":[5,8,10,5,8,0],"route 80s":[6,8,9,7,11,12],"Summer Vacation(CU mix)":[6,9,0,9,12,0],"Take It Easy":[7,10,11,6,11,0],"VJ ARMY":[6,7,8,5,7,10],"こっちを向いてよ":[5,6,7,6,9,11],"電人イェーガーのテーマ(Theme of DENJIN J)":[5,7,0,8,10,0],"19,November":[5,6,8,5,7,10],"A":[6,10,12,8,11,12],"AVE DE RAPINA":[6,8,9,8,10,0],"Bad Routine":[5,7,9,6,7,9],"BRING HER DOWN":[5,7,9,7,10,0],"Burning Heat! (Full Option Mix)":[3,5,7,4,5,9],"Cheer Train":[5,6,9,4,6,12],"CLOUDY MUSIC":[5,7,0,5,8,0],"D2R":[5,6,8,5,6,0],"DESTINY":[5,6,8,4,6,0],"entrance":[5,8,9,6,8,10],"foreplay":[4,8,8,5,9,11],"Glorious Days":[3,5,6,6,7,0],"Happy Wedding":[6,7,8,6,8,10],"i feel ...":[4,5,7,4,5,0],"Last Message":[5,8,9,6,10,11],"Let the Snow Paint Me":[4,6,7,6,7,0],"Love Me Do":[5,7,9,5,7,0],"Marmalade Reverie":[4,5,7,6,7,9],"MAX 300":[8,10,0,6,10,0],"Spica":[4,9,11,3,9,12],"stoic":[8,10,11,8,10,12],"Tomorrow Perfume":[6,9,9,6,10,11],"traces":[6,9,10,7,9,10],"ZERO-ONE":[5,9,10,5,8,10],"革命":[6,10,10,7,12,12],"abstract":[6,9,9,7,9,0],"airflow":[3,5,7,3,6,7],"ALIEN WORLD":[5,6,7,4,5,7],"ALL RIGHT":[4,8,9,7,8,10],"Attitude":[5,8,9,5,7,9],"bit mania":[4,5,8,5,6,0],"Blame":[6,7,11,6,7,10],"CELEBRATE NITE":[5,6,8,5,7,8],"Colors -Y&Co. Eurobeat Remix-":[5,9,10,6,10,10],"dissolve":[5,7,8,5,9,0],"dual control":[5,7,9,4,8,9],"FLUTE MAN":[4,7,8,5,7,9],"Giudecca":[4,9,11,5,10,11],"Halfway of promise":[4,8,11,5,8,10],"Hormiga obrera":[5,7,8,6,8,9],"LAB":[5,9,10,5,10,11],"LOVE IS ORANGE":[4,6,8,4,5,9],"memories":[5,9,9,5,10,11],"Monkey Dance":[4,7,9,5,6,9],"murmur twins":[5,9,11,5,10,12],"MUSIC TO YOUR HEAD":[4,7,9,8,8,9],"PLEASE DON'T GO":[5,7,12,4,9,10],"rainbow flyer":[5,9,11,4,10,11],"symbolic":[6,9,10,8,10,0],"thunder":[6,8,9,5,9,11],"WAR GAME":[4,8,10,4,7,10],"World Wide Love":[3,5,5,4,5,0],"xenon":[5,9,11,5,8,11],"夜のサングラス":[5,6,8,6,8,0],"合体せよ！ストロングイェーガー！！":[6,7,0,8,10,0],"桜":[7,10,12,8,10,12],"蒼い衝動":[5,7,8,5,6,9],"lower world":[6,9,10,7,10,12],"Silvia Drive":[4,8,9,7,10,11],"lights":[3,6,8,7,9,10],"Be Rock U (1998 burst style)":[4,7,9,4,7,0],"MARIA (I believe... )":[4,8,9,4,8,9],"Cradle":[5,8,10,6,10,0],"Make A Difference":[5,9,10,5,9,10],"moon_child":[5,10,12,4,11,12],"昭和企業戦士荒山課長":[3,6,7,4,6,0],"ライオン好き":[3,5,7,3,6,0],"真夏の花・真夏の夢":[4,6,9,5,8,10],"Golden Horn":[3,8,9,3,8,11],"ECHOES":[4,5,8,4,7,10],"Dreamin' Sun":[5,7,8,5,9,10],"Karma":[6,9,10,8,11,12],"BAD BOY BASS!! (dj Remo-con MIX)":[5,7,8,4,7,0],"quasar":[6,9,11,7,11,12],"ACT":[6,9,9,6,9,10],"SNOW":[5,7,10,5,8,10],"POWER DREAM":[4,8,10,5,8,8],"STAR FIELD":[3,8,9,5,8,0],"rottel-the-Mercury":[6,9,10,6,9,11],"one or eight":[7,10,12,7,8,10],"Really Love":[4,6,10,4,10,0],"LOVE SHINE":[5,9,10,4,7,9],"HYPER EUROBEAT (2DX style)":[5,8,10,6,8,0],"Sweet Sweet Magic":[5,8,10,5,9,11],"bag":[5,6,10,6,9,10],"e-motion 2003  -romantic extra-":[6,8,10,8,10,0],"Abyss -The Heavens Remix-":[7,10,10,6,9,10],"Distress":[7,10,0,9,11,0],"Let The Snow Paint Me -Y&Co. Remix-":[5,6,10,5,8,9],"I Was The One (80's EUROBEAT STYLE)":[4,6,7,4,6,8],"RISLIM -Remix-":[4,6,11,6,9,12],"BRIGHTNESS DARKNESS":[3,8,9,3,8,10],"Quickening":[5,9,10,5,7,10],"pandora":[5,8,9,7,9,11],"BABY LOVE":[6,7,10,6,7,11],"No.13":[8,10,11,6,10,12],"desolation":[2,4,5,3,4,0],"EXE":[4,8,10,4,8,0],"SHOOTING STAR":[7,8,9,6,9,11],"CARRY ON NIGHT (English version)":[5,7,9,5,8,10],"Boundary":[4,9,9,5,9,9],"Lucy":[4,9,11,4,10,0],"システムロマンス":[4,7,8,4,7,0],"SPACE FIGHT":[3,8,11,6,8,11],"Back Into The Light":[6,7,10,6,9,10],"Rise'n Beauty":[6,9,10,6,10,11],"雪月花":[6,10,12,8,10,12],"Narcissus At Oasis":[4,10,10,4,10,11],"rainbow rainbow":[7,10,11,7,9,11],"Love Is Eternity":[6,9,11,6,10,12],"Innocent Walls":[8,12,12,8,10,12],"Smell Like This":[5,7,8,6,8,9],"Daisuke":[6,8,10,5,8,11],"HIGH":[5,9,9,6,9,10],"LOW":[4,8,9,5,8,10],"FEEL IT":[5,9,10,5,9,10],"HI SCHOOL DREAM":[5,7,10,5,10,10],"ALIEN TEMPLE":[5,7,8,5,8,10],"1st Samurai":[5,10,11,7,10,12],"Debtty Daddy":[5,9,11,5,8,11],"Feedback":[5,8,10,5,10,10],"Freezing atmosphere":[4,6,9,4,8,10],"ASTRAL VOYAGE":[5,6,9,5,9,10],"DoLL":[5,6,7,6,7,9],"One More Lovely":[5,9,12,4,10,12],"GHOST REVIVAL":[5,9,10,4,9,12],"GRADIUS -FULL SPEED-":[4,8,10,3,7,11],"BLOCKS":[5,7,11,4,7,12],"BREATH":[6,7,10,5,8,10],"Don't be afraid myself":[5,9,10,6,9,10],"SPEEDY CAT":[5,8,9,5,9,10],"太陽～T・A・I・Y・O～":[4,8,9,4,8,0],"KEY":[6,8,11,5,8,11],"awakening":[5,7,10,5,7,9],"Sphere":[5,9,10,5,8,12],"ＵＬＴｉＭΛＴＥ":[5,7,9,4,7,0],"spiral galaxy":[5,9,11,5,9,10],"ANDROMEDA":[5,8,11,4,9,11],"RESONATE 1794":[5,10,11,4,11,0],"earth scape":[2,5,7,2,6,0],"Close my Eyes for Me":[5,8,9,5,8,11],"大桟橋":[3,6,9,3,6,0],"Wonder Bullfighter":[5,7,11,5,8,10],"ピアノ協奏曲第１番”蠍火”":[5,11,12,5,10,12],"INJECTION OF LOVE":[4,6,9,3,7,0],"The Hope of Tomorrow":[5,8,10,6,9,10],"FAKE TIME":[5,11,12,7,12,12],"Click Again":[5,6,11,4,6,10],"RED ZONE":[5,9,11,5,9,11],"Fly Away To India":[3,6,7,4,6,0],"Secret of Love":[5,7,11,5,9,0],"Be quiet":[5,9,11,6,8,11],"AGEHA":[5,8,9,5,7,8],"gigadelic":[9,12,12,10,12,12],"HORIZON":[5,7,8,5,7,9],"AA":[5,10,12,5,9,12],"D.A.N.C.E.!":[3,5,10,3,5,8],"NEBULA GRASPER":[6,9,10,7,9,11],"Raspberry\u2661Heart(English version)":[5,8,9,6,8,10],"GENOCIDE":[6,10,11,6,12,12],"double thrash":[6,10,10,5,10,0],"キャッシュレスは愛情消すティッシュ":[4,8,10,4,8,10],"Little Little Princess":[5,10,11,5,10,11],"ヒマワリ":[3,9,10,4,8,9],"冥":[5,10,12,5,11,12],"MOON RACE":[5,7,9,5,10,0],"LESSON 5":[5,8,9,5,7,11],"rage against usual":[7,10,12,6,10,11],"INAZUMA":[5,9,11,6,9,12],"HAPPY☆ANGEL":[5,7,10,6,7,10],"EDEN":[6,9,10,7,8,10],"CaptivAte～浄化～":[5,9,11,5,9,11],"Catch Me":[5,8,10,4,9,10],"月光":[5,8,10,4,9,10],"Under the Sky":[5,7,9,4,7,9],"Xepher":[5,10,11,5,10,11],"Twelfth Style":[6,7,10,6,9,9],"I am":[5,8,10,5,8,0],"合体せよ！ストロングイェーガー！！ (Ryu☆ remix)":[5,8,11,5,9,11],"garden":[4,7,10,4,7,12],"Agnus Dei":[5,9,10,5,8,11],"Tizona d'El Cid":[5,9,10,5,10,0],"EMPTY OF THE SKY":[3,5,8,3,5,8],"100% minimoo-G":[5,10,11,4,10,11],"PLASMA":[4,8,9,5,8,0],"SigSig":[5,7,10,5,7,11],"ラクエン":[4,6,11,4,9,11],"POODLE":[5,8,10,5,8,11],"Pollinosis":[4,6,11,4,8,9],"Get'em up to R.A.V.E":[5,8,10,5,8,0],"alla turca con passione":[5,8,10,4,8,10],"オレはビートマニア！お前は何マニア？":[7,8,10,5,7,9],"We are Disっ娘よっつ打ち命":[3,5,9,3,5,9],"vault of heaven":[4,8,10,4,7,9],"Love Magic":[5,8,10,4,8,0],"SPARK !":[4,7,9,4,6,8],"First Resolution":[5,7,9,5,8,10],"SCREAM SQUAD":[7,10,12,6,10,12],"Aurora":[7,10,11,7,10,11],"Votum stellarum":[4,9,10,4,11,0],"Pink Rose":[3,5,8,3,5,8],"Scripted Connection⇒ N mix":[6,8,10,6,9,10],"Scripted Connection⇒ H mix":[7,10,11,8,10,11],"Scripted Connection⇒ A mix":[7,10,12,8,10,11],"華蝶風雪":[6,10,11,7,10,12],"タシカナモノ":[5,7,9,5,7,10],"The Dirty of Loudness":[7,10,11,7,10,10],"D.C.fish":[5,9,11,5,8,11],"嘆きの樹":[8,11,12,7,11,12],"Melody Life":[4,6,9,4,6,0],"wish":[4,6,7,4,6,8],"Bloody Tears(IIDX EDITION)":[5,9,10,5,10,11],"CONTRACT":[9,10,11,7,10,12],"INFERNO":[5,7,9,5,7,10],"DEEP ROAR":[4,7,9,5,7,9],"ALFARSHEAR 双神威に廻る夢":[5,7,10,6,9,10],"Why did you go away":[5,8,10,5,9,11],"Apocalypse ～dirge of swans～":[5,9,10,5,8,11],"Heavenly Sun (IIDX VERSION)":[4,7,10,4,8,10],"with you…":[4,6,9,4,7,11],"bluemoon":[4,7,10,5,10,11],"This is Love":[4,8,10,5,8,0],"罠":[2,8,10,4,7,0],"Ganymede":[6,10,11,8,11,12],"Ubiquitous Fantastic Ride":[4,7,8,3,8,9],"BALLAD THE FEATHERS":[4,6,8,5,8,0],"Sun Field":[3,8,11,5,9,11],"Enjoy your life":[4,6,8,4,6,0],"BOOM BOOM DISCO NIGHT":[5,8,10,5,9,10],"Power of Love":[5,7,10,4,8,10],"So Fabulous !!":[5,8,10,5,9,11],"waxing and wanding":[7,10,11,7,10,11],"Harmony and Lovely":[4,8,11,5,9,11],"MINT":[6,10,11,5,10,12],"EURO-ROMANCE":[5,8,10,5,8,11],"Pretty Punisher":[4,7,10,5,7,0],"TYPE MARS(G-Style Mix)":[5,9,11,6,10,0],"Crazy K.I.N.O.":[5,7,9,5,8,11],"Broadbanded":[4,8,11,4,10,11],"Double\u2661\u2661Loving Heart":[3,6,9,4,7,10],"Zenius -I- vanisher":[5,7,10,5,8,11],"WISH(EUROBEAT MIX)":[5,8,9,5,8,9],"tripping contact(teranoid&MC Natsack Remix)":[6,10,11,7,10,12],"MOON":[5,9,10,5,10,0],"虹色":[5,8,9,5,7,8],"Concertino in Blue":[5,10,12,5,10,12],"カゴノトリ～弐式～":[6,9,12,6,9,12],"リグレット":[6,8,10,6,8,0],"INORI":[6,10,11,6,9,12],"PHOTONGENIC":[7,10,10,7,9,11],"Love Again...":[3,4,5,4,5,0],"TRANOID":[5,10,11,6,10,12],"Candy Galy":[7,10,12,6,8,12],"never…":[4,7,8,4,6,0],"GOLD RUSH":[7,9,11,6,8,10],"CaptivAte～誓い～":[6,9,10,6,9,11],"VANESSA":[8,11,12,7,11,12],"星をこの手に":[7,9,10,6,9,10],"零 - ZERO -":[6,8,9,6,8,10],"STARS☆☆☆(Re-tuned by HΛL) - IIDX EDITION -":[5,8,9,5,7,0],"Blind Justice ～Torn souls, Hurt Faiths ～":[6,8,11,7,8,10],"Air Bell":[5,6,8,5,7,8],"ヨシダさん":[5,7,9,5,6,8],"ANDROMEDA II":[5,9,10,5,10,0],"Cyber Force":[5,9,10,6,8,8],"smile":[7,9,11,7,9,12],"LASER CRUSTER":[7,11,12,7,11,12],"CROSSROAD ～Left Story～":[5,8,10,6,8,10],"HALF MOON":[4,8,10,4,7,0],"花吹雪 ～ IIDX LIMITED ～":[4,6,8,5,7,8],"電人、暁に斃れる。":[7,10,12,7,10,12],"FIRE FIRE":[7,10,12,7,9,11],"the shadow":[6,9,11,5,9,11],"Second Heaven":[5,8,11,6,8,11],"Dreaming Sweetness":[6,8,10,6,8,10],"Sense 2007":[9,11,12,9,12,12],"Make Me Your Own":[5,9,10,4,9,11],"heaven above":[5,7,9,5,7,9],"With your Smile":[4,6,8,4,7,8],"Roulette":[5,8,10,5,8,10],"シティ・エンジェル":[5,7,10,5,7,10],"X-rated":[4,8,10,5,8,10],"KAMAITACHI":[6,9,11,8,10,12],"METALLIC MIND":[4,8,9,5,7,0],"My Only Shining Star":[5,7,9,6,7,9],"CaptivAte～裁き～":[6,8,9,5,9,11],"High School Love":[4,6,9,5,7,9],"The Smile of You":[4,7,8,4,6,7],"Fascination MAXX":[9,11,12,9,10,12],"snow storm":[4,9,10,4,10,12],"four-leaf":[4,6,8,4,8,0],"クルクル☆ラブ～Opioid Peptide MIX～":[5,8,10,5,8,10],"Watch out!!":[4,6,9,4,6,0],"Anisakis -somatic mutation type\"Forza\"-":[6,10,11,6,10,12],"MENDES":[6,11,12,6,10,12],"Darling my LUV":[4,6,8,5,7,0],"MAX LOVE":[5,8,10,7,9,10],"Blue Rain":[6,8,11,6,7,10],"four pieces of heaven":[5,10,11,6,10,12],"走馬灯 -The Last Song-":[3,4,7,3,5,0],"THE DEEP STRIKER":[6,10,11,5,10,11],"STEEL NEEDLE":[6,10,11,6,10,11],"SOUND OF GIALLARHORN":[6,10,11,6,9,10],"REMINISCENCE":[6,9,10,6,9,11],"PROMISE FOR LIFE":[3,7,8,4,6,8],"高高度降下低高度開傘":[4,7,9,5,9,10],"oratio":[7,10,12,7,9,12],"Ristaccia":[6,9,12,5,8,10],"NEW GENERATION -もう、お前しか見えない-":[5,9,10,6,9,11],"TROOPERS":[6,10,12,6,10,12],"SHIFT":[5,8,10,5,8,10],"マチ子の唄":[4,6,8,4,7,9],"beatonic nation":[5,8,9,5,7,10],"State Of The Art":[5,8,9,6,8,9],"end of world":[6,9,10,5,10,11],"evergreen":[5,7,10,5,8,11],"ICARUS":[7,10,12,7,10,12],"Dazzlin' Darlin":[4,7,10,5,7,11],"Do it!! Do it!!":[8,10,11,5,10,12],"Time to Air":[6,10,11,7,9,11],"avant-guerre":[4,7,10,5,9,10],"Digitank System":[6,9,11,5,8,10],"エコ爺":[4,6,9,4,6,9],"2 tribe 4 K":[5,7,11,5,7,10],"madrugada":[4,7,9,3,7,10],"MENTAL MELTDOWN":[6,10,11,6,9,11],"the trigger of innocence":[5,7,9,6,9,10],"少年A":[6,10,12,6,10,12],"scar in the earth":[3,5,8,4,7,9],"Be OK":[5,8,10,6,9,12],"Kick Out 仮面":[5,7,9,5,7,10],"satfinal":[5,7,9,6,8,10],"Wanna Party?":[4,7,8,3,6,9],"Now and Forever":[5,8,10,5,9,11],"Freeway Shuffle":[4,7,10,5,8,9],"PARANOiA ～HADES～":[7,11,12,8,11,12],"Rising in the Sun(original mix)":[5,9,10,4,8,0],"華爛漫 -Flowers-":[6,8,10,7,9,10],"switch":[4,9,11,5,9,11],"ミラージュ・レジデンス":[5,9,10,6,10,12],"in the Sky":[7,9,11,7,10,11],"LOVELY STORM":[6,9,10,7,10,11],"satellite020712 from \"CODED ARMS\"":[6,9,11,8,10,12],"Ubertreffen":[6,10,11,7,10,11],"CaptivAte2～覚醒～":[6,9,11,5,9,11],"翼":[4,7,9,5,8,9],"B4U(BEMANI FOR YOU MIX)":[6,9,11,7,9,11],"Colorful Cookie":[5,10,12,7,10,12],"V2":[6,10,11,5,10,11],"天空脳番長危機十六連打":[5,10,11,5,10,11],"不沈艦CANDY":[6,9,12,6,9,11],"JEWELLERY STORM":[5,8,10,5,9,11],"HYPERION":[6,9,11,6,9,11],"BITTER CHOCOLATE STRIKER":[5,10,12,5,10,11],"Fly Above":[5,6,8,5,8,9],"Arabian Rave Night":[6,10,11,6,10,11],"山岡晃の「クイズ！家事都合！」":[4,7,10,5,8,10],"Queen's Tragedy":[4,8,10,4,8,9],"Kung-fu Empire":[6,10,11,6,10,11],"ミッドナイト堕天使":[5,7,9,5,8,9],"ALL MY TURN -このターンに、オレの全てを賭ける-":[6,9,11,6,9,11],"Marie Antoinette":[6,9,11,6,9,11],"Turii ～Panta rhei～":[4,9,10,4,8,10],"卑弥呼":[6,11,12,7,11,12],"smooooch・∀・":[4,8,10,5,8,10],"Flash Back 90's":[4,8,10,5,8,9],"Programmed World":[5,9,11,5,10,11],"まほろば":[5,7,9,5,8,11],"Mind Mapping":[4,7,9,4,7,8],"3y3s":[7,10,12,8,10,12],"Monkey Dance '09":[4,8,10,4,8,11],"ALL I NEED YOUR LOVE":[5,7,9,6,7,9],"NΦ CRIME":[4,7,9,5,8,9],"naughty girl@Queen's Palace":[5,9,11,5,8,10],"BRIDAL FESTIVAL !!!":[4,7,9,5,8,9],"MY FUTURE":[5,8,9,6,9,11],"Punch Love仮面":[5,8,10,6,9,10],"I'm Screaming LOVE":[4,6,7,5,7,9],"鉄甲乙女-under the steel-":[4,7,10,5,9,10],"You'll say \"Now!\"":[6,10,11,7,10,11],"Secrets":[6,9,11,5,10,11],"ハリツヤランデヴー":[5,8,10,5,8,10],"neogenesis":[4,6,9,5,7,9],"THE SHINING POLARIS(kors k mix)":[5,8,9,6,7,8],"Bahram Attack-猫叉Master Remix-":[4,9,10,5,9,11],"Cyber Force -DJ Yoshitaka Remix-":[5,9,10,6,9,10],"THANK YOU FOR PLAYING":[5,9,10,5,8,10],"Jack":[5,7,10,5,8,11],"凛として咲く花の如く":[6,9,10,6,9,10],"Go Beyond!!":[6,10,12,6,10,12],"SOLITON BEAM":[6,9,10,7,10,11],"Just a Little Smile":[4,8,11,5,8,11],"Elisha":[6,10,11,5,9,11],"たからもの":[6,8,9,5,7,10],"MIRACLE MEETS":[6,9,11,6,9,10],"NoN-Fiction Story!":[4,7,10,4,7,9],"DROP":[4,9,11,4,8,11],"Roots of my way!":[4,7,9,5,7,9],"G59":[7,10,12,6,11,12],"DOMINION":[7,10,12,5,10,12],"GALGALIM":[6,10,11,7,10,12],"EXUSIA":[6,10,12,8,10,12],"with me...":[5,8,10,5,8,9],"being torn the sky":[4,7,10,3,7,9],"She is my wife":[5,9,10,5,9,10],"NEW SENSATION -もう、あなたしか見えない-":[6,10,11,6,9,11],"Raison d'etre～交差する宿命～":[5,10,11,6,10,12],"Almagest":[7,11,12,6,11,12],"ワルツ第17番 ト短調”大犬のワルツ”":[6,10,12,6,10,12],"バビロニア":[4,7,8,4,6,8],"Last Burning":[5,7,10,4,7,9],"Bad Maniacs":[7,10,12,7,10,12],"Programmed Sun":[6,9,11,4,9,10],"D":[8,10,11,6,10,11],"bloomin' feeling":[7,9,11,6,10,11],"Light Shine":[5,7,10,5,9,11],"DESIRE":[5,9,11,5,8,10],"AIR RAID FROM THA UNDAGROUND":[7,9,11,6,9,11],"Brazilian Fire":[6,8,9,4,7,9],"One of A Kind":[4,8,9,4,7,9],"Red. by Full Metal Jacket":[6,10,12,6,9,12],"コスモス":[5,8,9,5,8,9],"かずあそび":[3,6,8,4,7,9],"beatchic☆仮面～好き、でいさせて～":[5,8,9,5,8,10],"Sunrise":[5,9,10,6,9,11],"未来のプリズム":[4,7,9,4,8,10],"Keep it-秋葉工房mix-":[5,9,10,5,9,11],"Dazzlin' Darlin-秋葉工房mix-":[4,8,10,5,8,11],"Session 1 -Genesis-":[6,9,11,8,9,11],"Hydrogen Blueback":[5,8,10,5,8,10],"mosaic":[7,10,12,7,8,11],"Empire State Glory":[6,9,11,6,10,11],"SPARK ! -essential RMX-":[5,8,10,5,8,10],"CaptivAte～裁き～(SUBLIME TECHNO MIX)":[6,8,10,5,8,10],"bass 2 bass":[4,7,10,5,7,10],"IN THE NAME OF LOVE":[4,7,9,4,8,10],"Special One":[5,7,9,5,8,9],"Evans":[6,11,12,7,10,12],"水上の提督(Short mix from \"幻想水滸伝V\")":[4,8,10,3,9,10],"eRAseRmOToRpHAntOM":[7,10,12,8,10,12],"DAWN -THE NEXT ENDEAVOUR-":[7,9,11,8,9,10],"サヨナラ・ヘヴン":[4,6,8,6,7,8],"quell～the seventh slave～":[4,9,12,7,9,12],"SOLID STATE SQUAD":[5,10,12,5,11,12],"GOLDEN CROSS":[4,9,12,6,8,12],"The Story Begins":[4,8,10,6,9,11],"BEAUTIFUL ANGEL":[4,8,10,5,8,10],"THE LAST STRIKER":[6,8,11,6,8,10],"Sorrows":[5,8,10,5,8,11],"Stay my side":[4,6,8,4,6,7],"Watch Out Pt.2":[6,9,12,6,9,11],"Tropical April":[8,10,11,6,9,11],"DAYDREAMER":[6,8,10,6,8,10],"perditus†paradisus":[7,11,12,7,11,12],"THE DOOR INTO RAINBOW":[4,8,10,4,9,11],"XANADU OF TWO":[5,8,10,5,8,10],"ELECTRIC MASSIVE DIVER":[6,10,12,6,9,12],"THE BLACK KNIGHT":[5,10,11,6,10,12],"PARADISE LOST":[7,11,12,7,10,12],"Never Fade Away":[4,8,11,5,9,11],"おおきなこえで":[3,5,7,3,5,7],"Destiny Sword":[5,9,11,5,9,11],"Aegis":[6,8,11,5,8,10],"ZETA～素数の世界と超越者～":[4,9,11,6,10,12],"旅人リラン":[6,9,11,6,10,12],"La Mar":[4,6,8,4,6,8],"Dances with Snow Fairies":[7,10,12,7,10,12],"I FIGHT ME":[3,7,9,4,7,10],"Vermillion":[5,7,10,5,8,10],"Programmed Life":[6,9,10,6,9,11],"Kailua":[5,9,11,4,9,12],"Bounce Bounce Bounce":[5,9,11,5,9,11],"Mermaid girl":[5,8,10,6,8,10],"passionate fate":[6,8,10,6,9,11],"Golden Palms":[5,8,10,5,9,10],"New Castle Legions":[6,10,11,6,10,12],"BLUST OF WIND":[5,8,10,5,8,10],"BROKEN EDEN":[6,9,11,6,10,11],"かげぬい ～ Ver.BENIBOTAN ～":[5,7,9,5,7,10],"Rock Da House":[5,9,11,5,8,10],"EXTREMA PT. 2":[4,7,10,4,7,10],"灼熱Beach Side Bunny":[7,10,12,6,10,12],"Raise your hands":[6,8,10,6,8,11],"You Were The One":[5,8,10,4,8,10],"Answer":[4,7,10,5,7,9],"WISE UP!":[3,7,9,3,6,9],"LIFE SCROLLING":[4,8,10,4,8,10],"Session 9 -Chronicles-":[5,10,12,5,10,12],"Space Time":[4,8,10,4,8,11],"ラクエン Feat.Chiharu Chonan -JAKA respect for K.S.K. Remix":[6,8,10,6,8,11],"夕焼け ～Fading Day～":[5,9,11,5,9,11],"Believe In Me":[5,9,11,5,9,11],"Let The Track Flow":[6,9,11,5,8,11],"Energy Drive":[6,8,11,6,8,11],"Hardcore Mania":[6,8,10,5,8,10],"Breaking the ground":[5,8,10,5,8,10],"Programmed Sun (xac Antarctic Ocean mix)":[4,7,10,4,7,10],"Cansei de S NIK":[4,7,9,4,7,9],"reunion":[8,11,12,8,11,12],"ANTHEM LANDING":[5,9,11,6,10,11],"Medicine of love":[4,6,9,4,6,9],"Eternal Tears":[2,5,7,2,5,7],"Fantasia":[3,8,10,4,8,10],"SABER WING":[5,9,11,5,9,12],"DM STAR～関西 energy style～":[6,9,10,6,9,11],"WE LOVE SHONAN":[4,9,10,4,8,11],"ALBIDA":[6,10,12,6,9,11],"黒髪乱れし修羅となりて":[4,9,12,5,10,12],"sakura storm":[5,8,12,6,10,12],"Everlasting Resort":[4,7,10,5,7,10],"Take Me Higher":[4,8,10,4,8,10],"STELLAR WIND":[4,9,11,5,9,11],"Love km":[3,8,10,4,8,10],"Sakura Reflection":[3,9,11,6,9,11],"THE FALLEN":[5,8,11,5,9,11],"Broken":[5,9,12,5,9,12],"Wuv U":[3,8,10,7,9,11],"Survival Games":[4,7,10,4,8,10],"SPECIAL SUMMER CAMPAIGN!":[4,8,12,6,10,12],"中華急行":[2,8,10,5,8,10],"Snake Stick":[6,10,12,6,10,12],"天空の夜明け":[7,10,12,7,11,12],"F":[5,10,12,5,10,12],"In the Blackest Den":[5,8,11,5,8,11],"恋する☆宇宙戦争っ！！":[5,8,12,4,8,12],"ANAGRAMS I to Y":[4,7,9,4,8,9],"YAKSHA":[6,10,12,6,11,12],"DIAVOLO":[6,9,12,7,10,12],"Scharfrichter":[5,9,11,6,9,11],"Lucky Days":[4,8,10,4,8,10],"CALL":[2,5,8,2,8,8],"KYAMISAMA ONEGAI!":[3,6,9,3,6,9],"Several Words":[4,8,10,4,8,10],"SA.YO.NA.RA. SUPER STAR":[4,8,10,5,9,11],"蛇神":[4,8,11,4,8,11],"Todestrieb":[5,9,12,5,9,12],"GIGANT":[3,6,9,3,7,10],"prompt":[5,8,11,5,8,11],"衰色小町メランコリア":[4,7,10,4,7,10],"Quick Silver":[5,9,11,5,9,11],"Into The Sunlight":[5,8,10,5,8,10],"君のハートにロックオン":[4,9,11,4,8,12],"ЁVOLUTIΦN":[4,8,10,5,8,10],"Almace":[4,8,10,4,8,11],"Drive Me Crazy":[4,7,10,4,7,10],"The Sampling Paradise":[5,9,12,5,10,12],"Release The Music":[4,7,10,4,7,10],"Thunderbolt":[5,9,12,5,9,11],"Follow Tomorrow":[4,8,10,4,8,10],"NNRT":[6,10,12,6,10,12],"SHADE":[5,9,11,5,10,11],"24th Century BOY":[5,9,11,5,9,11],"The Limbo":[6,10,12,6,10,12],"Miami Sunset Drive":[4,6,9,4,7,10],"A MINSTREL ～ ver. short-scape ～":[3,6,9,3,8,9],"LAX5 feat.Ryota Yoshinari":[6,9,10,6,9,10],"BLACK.by X-Cross Fade":[6,10,12,6,10,12],"Yellow Sunrise":[4,7,10,4,8,11],"陽炎":[3,6,9,3,6,10],"Mermaid girl-秋葉工房 MIX-":[4,6,9,4,7,9],"Session 12 -Esther-":[6,10,12,6,10,12],"聖人の塔":[6,10,12,6,10,12],"DON'T WAKE ME FROM THE DREAM (2010 Summer Edition)":[3,7,9,4,7,9],"Express Emotion":[4,6,10,4,6,9],"突撃!ガラスのニーソ姫!":[4,7,10,4,8,10],"Liquid Crystal Girl feat. echo":[2,6,9,2,6,9],"Round and Round":[4,6,9,3,6,10],"Star Trail":[4,7,10,4,7,10],"LOVE B.B.B":[4,8,10,4,8,10],"Voxane":[3,7,9,3,7,9],"Change the World":[5,7,9,6,9,11],"ユミル":[3,7,11,5,8,11],"Phoenix":[5,7,10,5,8,11],"RESISTANCE":[3,7,10,3,7,10],"LETHEBOLG ～双神威に斬り咲けり～":[5,8,10,5,8,10],"I'm so Happy":[3,8,11,5,9,11],"Snow Goose":[3,8,11,4,9,11],"Far east nightbird":[3,7,9,4,8,10],"PentaCube Gt.(RX-Ver.S.P.L.)":[4,8,9,6,8,10],"Infinite cave":[6,9,10,8,10,12],"QUANTUM TELEPORTATION":[7,10,11,7,10,12],"fffff":[4,10,12,5,10,12],"子供の落書き帳":[6,10,12,7,10,12],"Trust -MATERIAL ver- (IIDX Edition)":[4,7,9,4,8,10],"yellow head joe":[4,8,10,4,9,12],"WONDER WALKER":[5,9,12,5,9,12],"532nm":[3,7,11,4,7,11],"ビューティフルレシート":[3,8,10,4,9,11],"quaver♪":[4,9,12,4,9,12],"Castle on the Moon":[4,9,11,4,9,11],"Flip Flap":[3,7,10,3,7,10],"TITANS RETURN":[4,8,11,4,8,11],"HAERETICUS":[5,10,12,5,10,12],"STAR DREAM":[5,7,9,7,8,0],"Ready To Rockit Blues":[3,6,9,5,6,9],"More Move":[5,7,8,5,8,8],"Leaving...":[4,8,10,4,7,10],"GRID KNIGHT":[6,8,10,7,8,10],"405nm (Ryu☆mix)":[5,9,11,5,9,11],"Ascalon":[5,8,10,6,9,11],"BLUE STRAGGLER":[4,7,10,4,8,10],"Breaking Dawn feat. NO+CHIN, AYANO":[5,8,11,5,8,11],"connective":[2,6,8,2,6,8],"Deceive Your Insight":[5,8,11,5,9,11],"Devilz Staircase":[3,10,12,4,10,12],"Echo Of Forever":[3,6,9,4,7,10],"FLOWER":[6,9,11,6,9,12],"Fly you to the star":[4,8,10,4,8,11],"GRADIUS 2012":[5,8,10,5,8,10],"Howling":[4,7,9,4,7,10],"I know You know":[3,6,9,3,6,9],"ILIAS":[4,7,10,4,8,10],"Illegal Function Call":[5,9,11,5,9,11],"In Heaven":[4,7,9,5,7,9],"Liberation":[6,9,12,6,10,12],"Light and Cyber…":[5,9,11,5,9,11],"Little Star":[5,8,12,5,8,12],"LUV CAN SAVE U":[3,7,9,3,6,10],"Neonlights":[4,8,10,4,10,11],"POINT ZERO":[4,7,10,4,7,10],"portal":[4,7,10,3,7,9],"Präludium":[4,8,10,4,8,11],"Re:GENERATION":[5,8,10,5,8,11],"Shining World":[6,8,9,4,7,9],"Spinning Around":[5,7,10,4,8,10],"Take My Life":[5,8,11,5,9,11],"To my star":[3,6,9,3,7,9],"YELLOW FROG  from Steel Chronicle":[3,7,9,4,6,10],"ZED":[5,8,11,5,8,11],"下弦の月":[5,7,9,5,7,9],"狂イ咲ケ焔ノ華":[6,10,12,6,10,12],"メイメツ、フラグメンツ":[4,8,10,4,7,11],"Sol Cosine Job 2":[6,9,12,6,11,12],"Time To Empress":[4,9,10,7,9,11],"mnemoniq":[4,5,8,5,8,9],"SYNC-ANTHEM":[5,10,12,6,10,12],"ΕΛΠΙΣ":[6,10,12,6,10,12],"rumrum triplets":[5,10,11,5,10,12],"S!ck":[5,8,11,5,9,11],"CONCEPTUAL":[5,7,11,5,8,11],"Thor's Hammer":[5,10,12,5,10,12],"New Decade IIDX Edition":[5,9,11,5,9,11],"Plan 8":[6,10,12,6,10,12],"neu":[6,10,12,6,10,12],"Hollywood Galaxy":[5,10,12,6,9,12],"JOMANDA":[6,10,12,6,10,12],"仮想空間の旅人たち":[5,9,11,5,8,11],"8bit Princess":[3,6,10,3,6,10],"Reflection Into the EDEN":[4,7,10,5,7,10],"トリカゴノ鳳凰":[6,9,12,6,9,12],"planarian":[4,8,10,4,8,11],"龍と少女とデコヒーレンス":[5,8,11,5,9,11],"Tp-RZ":[5,7,10,5,7,10],"たまゆら":[7,10,12,6,10,12],"Proof of the existence":[6,10,12,6,10,12],"DAY DREAM":[5,10,12,6,10,12],"Timepiece phase II":[5,10,12,6,11,12],"Timepiece phase II (CN Ver.)":[6,10,12,6,11,12],"Rainbow after snow":[3,7,10,5,8,10],"Beastie Starter":[3,7,11,3,7,11],"アストライアの双皿":[4,9,12,5,9,12],"†渚の小悪魔ラヴリィ～レイディオ†(IIDX EDIT)":[3,9,12,3,9,12],"Holy Snow":[4,8,10,6,10,12],"True Blue":[5,10,12,5,10,12],"Confiserie":[5,10,12,5,10,12],"Saturn":[7,10,11,6,10,11],"BRAVE GLOW":[4,8,10,4,8,10],"VEGA":[5,9,11,5,9,11],"カジノファイヤーことみちゃん":[4,8,11,4,8,12],"Cookie Bouquets":[5,9,11,7,10,11],"New Lights":[6,9,10,6,9,10],"Fractal":[6,9,11,8,10,12],"即席！脳直★ミュージックシステム":[6,10,12,6,9,12],"虹色の花":[4,8,10,4,8,11],"お米の美味しい炊き方、そしてお米を食べることによるその効果。":[5,8,10,5,9,10],"ラキラキ":[4,8,10,4,8,10],"GAIA":[5,10,12,5,10,12],"STULTI":[5,10,12,5,10,12],"Empathetic":[4,7,10,4,8,11],"Synergy For Angels":[4,8,11,4,8,11],"晴天Bon Voyage":[3,7,9,4,7,9],"創世ノート":[4,9,11,4,9,11],"Elemental Creation":[7,10,12,8,10,12],"キャトられ\u2665恋はモ～モク":[6,10,12,6,10,12]};

  function getStar(musicName, gameMode, difficulty) {
    if (musicName in STAR_MAP) {
      var stars = STAR_MAP[musicName];
      var index = gameMode * 3 + difficulty;
      if (index in stars) {
        return stars[index];
      }
      return null;
    }
    console.warn('No star data for ' + musicName);
    return null;
  }

  var GAME_MODE_NAMES = ['SP', 'DP'];
  var NUM_GAME_MODES = GAME_MODE_NAMES.length;

  var DIFFICULTY_INFOS = [
      ['N', 'blue'],
      ['H', 'yellow'],
      ['A', 'red']
  ];
  var NUM_DIFFICULTIES = DIFFICULTY_INFOS.length;

  function difficultyIDToColor(d) {
    return DIFFICULTY_INFOS[d][1];
  }

  function difficultyIDToText(d) {
    return DIFFICULTY_INFOS[d][0];
  }

  var LAMPS = [
      ['NO PLAY', 'NO'],
      ['FAILED', 'FL'],
      ['ASSIST CLEAR', 'AS'],
      ['EASY CLEAR', 'EA'],
      ['CLEAR', 'CL'],
      ['HARD CLEAR', 'HD'],
      ['EX HARD CLEAR', 'EX'],
      ['FULL COMBO', 'FC']
  ];
  // Lamp name -> [lamp name abbreviation, lamp ID]
  var LAMP_MAP = {};
  for (var i = 0; i < LAMPS.length; ++i) {
    var name = LAMPS[i][0];
    var abbrev = LAMPS[i][1];
    LAMP_MAP[name] = [abbrev, i];
  }

  function lampNameToID(name) {
    if (name in LAMP_MAP) {
      return LAMP_MAP[name][1];
    }
    return null;
  }

  var DJ_LEVELS = ['AAA', 'AA', 'A', 'B', 'C', 'D', 'E', 'F'];
  var DJ_LEVEL_MAP = {};
  for (var i = 0; i < DJ_LEVELS.length; ++i) {
    DJ_LEVEL_MAP[DJ_LEVELS[i]] = i;
  }

  function djLevelNameToID(alt) {
    if (alt in DJ_LEVEL_MAP) {
      return DJ_LEVEL_MAP[alt];
    }
    return null;
  }

  function setThClass(th, index) {
    var classValue = 'right_border left_title' +
      (index % 2 + 1);
    th.setAttribute('class', classValue);

    th.style['padding'] = '0';
  }

  function setTdClass(td, index, lastColumn) {
    var classValue = '';
    if (!lastColumn) {
      classValue += 'right_border ';
    }
    if (index % 2 == 1) {
      classValue += 'table_type_minfo_td' +
        ((index - 1) / 2 % 2 + 1);
    }
    td.setAttribute('class', classValue);

    td.style['padding'] = '0';
  }

  function setRowStyle(tr, count) {
    for (var i = 0; i < tr.childNodes.length; ++i) {
      var nodeName = tr.childNodes[i].nodeName.toLowerCase();
      if (nodeName == 'th') {
        setThClass(tr.childNodes[i], count);
      } else if (nodeName == 'td') {
        setTdClass(tr.childNodes[i], count);
      }
    }
  }

  function StatusWidget() {
    this.div_ = document.createElement('div');
    this.div_.setAttribute('align', 'center');
  }

  StatusWidget.prototype.div = function() {
    return this.div_;
  }

  StatusWidget.prototype.clear = function() {
    while (this.div_.firstChild) {
      this.div_.removeChild(this.div_.lastChild);
    }
  }

  StatusWidget.prototype.append = function(node) {
    this.div_.appendChild(node);
  }

  function StatsWidget() {
    this.clearStats_();

    this.div_ = document.createElement('div');
    this.div_.setAttribute('align', 'center');
    this.createView_();
  }

  StatsWidget.prototype.div = function() {
    return this.div_;
  }

  StatsWidget.prototype.clear = function() {
    this.clearStats_();

    for (var m = 0; m < NUM_GAME_MODES; ++m) {
      for (var d = 0; d < 12; ++d) {
        var row = m * 12 + 11 - d;

        this.tbody_.childNodes[1 + row * 2].style['display'] = 'none';
        this.tbody_.childNodes[1 + row * 2 + 1].style['display'] = 'none';
      }
    }

    this.updateView_();
  }

  StatsWidget.prototype.clearStats_ = function() {
    this.lampStats_ = [];
    this.djLevelStats_ = [];

    for (var m = 0; m < NUM_GAME_MODES; ++m) {
      var lampStatList = [];
      var djLevelStatList = [];
      for (var d = 0; d < 12; ++d) {
        lampStatList.push({});
        djLevelStatList.push({});
      }
      this.lampStats_.push(lampStatList);
      this.djLevelStats_.push(djLevelStatList);
    }
  }

  StatsWidget.prototype.createView_ = function() {
    this.tbody_ = document.createElement('tbody');

    var table = document.createElement('table');
    table.appendChild(this.tbody_);
    table.setAttribute('border', '0');
    table.setAttribute('cellspacing', '3px');
    table.setAttribute('cellpadding', '0');
    table.style['border'] = 'solid 1px black';
    this.div_.appendChild(table);

    var headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('td'));
    for (var i = LAMPS.length - 1; i >= 0; --i) {
      var th = document.createElement('th');

      var lampDefinition = LAMPS[i];
      var lampAbbrev = lampDefinition[1];

      th.appendChild(document.createTextNode(lampAbbrev));

      headerRow.appendChild(th);
    }
    for (var i = 0; i < DJ_LEVELS.length; ++i) {
      var th = document.createElement('th');

      th.appendChild(document.createTextNode(DJ_LEVELS[i]));

      headerRow.appendChild(th);
    }
    this.tbody_.appendChild(headerRow);

    for (var m = 0; m < NUM_GAME_MODES; ++m) {
      for (var d = 12; d >= 1; --d) {
        var tr = document.createElement('tr');

        var th = document.createElement('th');
        th.appendChild(document.createTextNode(GAME_MODE_NAMES[m] + '☆' + d))
        th.setAttribute('rowspan', '2');
        th.style['background-color'] = '#a0a0a0';

        tr.appendChild(th);

        for (var i = 0; i < 2; ++i) {
          if (i == 1) {
            tr = document.createElement('tr');
          }

          for (var j = 0; j < LAMPS.length; ++j) {
            var td = document.createElement('td');
            td.style['text-align'] = 'right';
            td.style['background-color'] = '#a0a0a0';
            tr.appendChild(td);
          }

          for (var j = 0; j < DJ_LEVELS.length; ++j) {
            var td = document.createElement('td');
            td.style['text-align'] = 'right';
            td.style['background-color'] = '#a0a0a0';
            tr.appendChild(td);
          }

          this.tbody_.appendChild(tr);
        }
      }
    }
  }

  StatsWidget.prototype.append = function(result) {
    {
      var stat = this.lampStats_[result.gameMode][result.star - 1];
      if (result.lamp in stat) {
        ++stat[result.lamp];
      } else {
        stat[result.lamp] = 1;
      }
    }

    {
      var stat = this.djLevelStats_[result.gameMode][result.star - 1];
      if (result.djLevel in stat) {
        ++stat[result.djLevel];
      } else {
        stat[result.djLevel] = 1;
      }
    }

    this.updateView_();
  }

  StatsWidget.prototype.updateView_ = function() {
    for (var m = 0; m < NUM_GAME_MODES; ++m) {
      for (var d = 0; d < 12; ++d) {
        var row = m * 12 + 11 - d;

        var rawRow = this.tbody_.childNodes[1 + row * 2];
        var sumRow = this.tbody_.childNodes[1 + row * 2 + 1];

        {
          var stat = this.lampStats_[m][d];
          var sum = 0;
          for (var i = LAMPS.length - 1; i >= 0; --i) {
            var count = 0;
            if (i in stat) {
              count = stat[i];
            }

            sum += count;

            if (i == 1 && sum > 0) {
              rawRow.style['display'] = 'table-row';
              sumRow.style['display'] = 'table-row';
            }

            rawRow.childNodes[LAMPS.length - i].innerText = count;
            sumRow.childNodes[LAMPS.length - i - 1].innerText = sum;
          }
        }

        {
          var stat = this.djLevelStats_[m][d];
          sum = 0;
          for (var i = 0; i < DJ_LEVELS.length; ++i) {
            var count = 0;
            if (i in stat) {
              count = stat[i];
            }

            sum += count;

            if (i == DJ_LEVELS.length - 1 && sum > 0) {
              rawRow.style['display'] = 'table-row';
              sumRow.style['display'] = 'table-row';
            }

            rawRow.childNodes[LAMPS.length + 1 + i].innerText = count;
            sumRow.childNodes[LAMPS.length + i].innerText = sum;
          }
        }
      }
    }
  }

  function ResultWidget(table) {
    this.rows_ = [];

    this.reverseSort_ = false;
    this.currentSortKey_ = 0;

    this.filtered_ = false;

    this.createView_();
  }

  // Column number -> key for the corresponding data.
  ResultWidget.COLUMN_MAP_ = [
      'musicName',
      'gameMode',
      'difficulty',
      'star',
      'lamp',
      'djLevel',
      'score',
      'missCount'
  ];

  ResultWidget.prototype.table = function() {
    return this.table_;
  }

  ResultWidget.prototype.createView_ = function() {
    this.tbody_ = document.createElement('tbody');

    var tableHeaderRow = document.createElement('tr');
    var TABLE_HEADER_TEXTS = [
        'Name',
        'M',
        'D',
        'S',
        'Lamp',
        'DJLv',
        'Score',
        'Miss'
    ];
    for (var i = 0; i < TABLE_HEADER_TEXTS.length; ++i) {
      var th = document.createElement('th');
      var handler = function(resultObj, column) {
        resultObj.sortRows_(column);
      };
      th.addEventListener('click', handler.bind(null, this, i));
      th.appendChild(document.createTextNode(TABLE_HEADER_TEXTS[i]));
      tableHeaderRow.appendChild(th);
    }

    this.tbody_.appendChild(tableHeaderRow);

    this.table_ = document.createElement('table');
    this.table_.setAttribute('border', '0');
    this.table_.setAttribute('cellspacing', '0');
    this.table_.setAttribute('cellpadding', '0');
    this.table_.setAttribute('class', 'table_type_minfo');

    this.table_.appendChild(this.tbody_);
  }

  ResultWidget.prototype.clear = function() {
    this.rows_ = [];

    while (this.tbody_.childNodes.length > 1) {
      this.tbody_.removeChild(this.tbody_.lastChild);
    }

    this.currentSortKey_ = 0;
  }

  ResultWidget.prototype.setupFilterHandlers_ = function(row) {
    for (var i = 0; i < row.childNodes.length; ++i) {
      var handler = function(resultObj, rowID, value) {
        resultObj.filterRows_(rowID, value);
      };
      row.childNodes[i].addEventListener(
          'click',
          handler.bind(null, this, i, row.sourceData[ResultWidget.COLUMN_MAP_[i]]));
    }
  }

  ResultWidget.prototype.append = function(result) {
    var tr = document.createElement('tr');

    tr.sourceData = result;

    var difficultyColor = difficultyIDToColor(result.difficulty);

    {
      var th = document.createElement('th');
      th.appendChild(document.createTextNode(result.musicName));
      th.setAttribute('width', '150em');
      th.style['color'] = difficultyColor;
      tr.appendChild(th);
    }

    {
      var th = document.createElement('th');
      th.appendChild(document.createTextNode(GAME_MODE_NAMES[result.gameMode]));
      tr.appendChild(th);
    }

    {
      var th = document.createElement('th');
      th.appendChild(document.createTextNode(difficultyIDToText(result.difficulty)));
      th.style['color'] = difficultyColor;
      tr.appendChild(th);
    }

    {
      var td = document.createElement('td');
      if (result.musicName in STAR_MAP) {
        var stars = STAR_MAP[result.musicName];
        star = stars[result.difficulty + result.gameMode * 3];
        td.appendChild(document.createTextNode(star));
      }
      tr.appendChild(td);
    }

    {
      var td = document.createElement('td');
      if (result.lamp != Number.MAX_VALUE) {
        var img = document.createElement('img');
        img.setAttribute('src', '/game/2dx/20/p/images/score_icon/clflg' + result.lamp + '.gif');
        td.appendChild(img);
      }
      tr.appendChild(td);
    }

    {
      var td = document.createElement('td');
      if (result.djLevel != Number.MAX_VALUE) {
        var img = document.createElement('img');
        img.setAttribute('src', '/game/2dx/20/p/images/score_icon/' + DJ_LEVELS[result.djLevel] + '.gif');
        td.appendChild(img);
      }
      tr.appendChild(td);
    }

    {
      var td = document.createElement('td');
      if (result.score != -1) {
        td.appendChild(document.createTextNode(result.score));
      }
      tr.appendChild(td);
    }

    {
      var td = document.createElement('td');
      if (result.missCount != Number.MAX_VALUE) {
        td.appendChild(document.createTextNode(result.missCount));
      }
      tr.appendChild(td);
    }

    setRowStyle(tr, this.rows_.length);
    this.setupFilterHandlers_(tr);

    this.rows_.push(tr);
    this.tbody_.appendChild(tr);
  }

  ResultWidget.prototype.sortRows_ = function(itemID) {
    if (this.currentSortKey_ == itemID) {
      this.reverseSort_ = !this.reverseSort_;
    } else {
      this.reverseSort_ = false;
    }

    var reverseSort = this.reverseSort_;
    this.rows_.sort(function cmp(a, b) {
        var keys = [itemID, 1, 3, 4, 5, 7, 6, 0, 2];
        for (var i in keys) {
          var key = keys[i];
          var reverse = reverseSort && key == itemID;
          // Difficulty, star, lamp and score
          var reverse = reverseSort ^
              (key == 2 || key == 3 || key == 4 || key == 6);
          key = ResultWidget.COLUMN_MAP_[key];
          if (a.sourceData[key] < b.sourceData[key])
            return reverse ? 1 : -1;
          if (a.sourceData[key] > b.sourceData[key])
            return reverse ? -1 : 1;
        }
        return 0;
    });

    while (this.tbody_.childNodes.length > 1) {
      this.tbody_.removeChild(this.tbody_.lastChild);
    }
    for (var i = 0; i < this.rows_.length; ++i) {
      this.tbody_.appendChild(this.rows_[i]);
    }

    this.updateRowStyle_();

    this.currentSortKey_ = itemID;
  }

  ResultWidget.prototype.updateRowStyle_ = function() {
    var numDisplayed = 0;
    for (var i = 1; i < this.tbody_.childNodes.length; ++i) {
      var row = this.tbody_.childNodes[i];
      if (row.style['display'] != 'none') {
        setRowStyle(row, numDisplayed);
        ++numDisplayed;
      }
    }
  }

  ResultWidget.prototype.filterRows_ = function(itemType, itemValue) {
    if (this.filtered_) {
      for (var i = 1; i < this.tbody_.childNodes.length; ++i) {
        this.tbody_.childNodes[i].style['display'] = 'table-row';
      }
      this.filtered_ = false;
    } else {
      for (var i = 1; i < this.tbody_.childNodes.length; ++i) {
        var row = this.tbody_.childNodes[i];
        if (row.sourceData[ResultWidget.COLUMN_MAP_[itemType]] == itemValue) {
          row.style['display'] = 'table-row';
        } else {
          row.style['display'] = 'none';
        }
      }
      this.filtered_ = true;
    }

    this.updateRowStyle_();
  }

  function MusicInfoParser() {}

  MusicInfoParser.extractAltFromFirstImg_ = function(td) {
    var first = td.firstChild;
    if (!first || first.nodeName.toLowerCase() != 'img') {
      return null;
    }
    return first.getAttribute('alt');
  };

  MusicInfoParser.extractIntFromFirstText_ = function(td) {
    var first = td.firstChild;
    if (!first || first.nodeName.toLowerCase() != '#text') {
      return null;
    }
    var parsedValue = parseInt(td.firstChild.wholeText);
    if (isNaN(parsedValue)) {
      return null;
    }
    return parsedValue;
  };

  MusicInfoParser.parseLamp_ = function(tds, base) {
    var tdIndex = base;
    if (tdIndex in tds) {
      return lampNameToID(MusicInfoParser.extractAltFromFirstImg_(tds[tdIndex]));
    }
    return null;
  };

  MusicInfoParser.parseDJLevel_ = function(tds, base) {
    var tdIndex = base + NUM_DIFFICULTIES;
    if (tdIndex in tds) {
      return djLevelNameToID(MusicInfoParser.extractAltFromFirstImg_(tds[tdIndex]));
    }
    return null;
  };

  MusicInfoParser.parseScore_ = function(tds, base) {
    var tdIndex = base + 2 * NUM_DIFFICULTIES;
    if (tdIndex in tds) {
      return MusicInfoParser.extractIntFromFirstText_(tds[tdIndex])
    }
    return null;
  };

  MusicInfoParser.parseMissCount_ = function(tds, base) {
    var tdIndex = base + 3 * NUM_DIFFICULTIES;
    if (tdIndex in tds) {
      return MusicInfoParser.extractIntFromFirstText_(tds[tdIndex]);
    }
    return null;
  };

  MusicInfoParser.parseMusicName_ = function(response) {
    var musicInfo = response.querySelector('.music_info_td');
    if (!musicInfo) {
      return null;
    }

    var first = musicInfo.firstChild;
    if (!first || first.nodeName.toLowerCase() != '#text') {
      return null;
    }

    return first.wholeText.trim();
  };

  MusicInfoParser.parse = function(response) {
    var tds = response.getElementsByTagName('td');
    if (!tds) {
      return null;
    }

    var musicName = MusicInfoParser.parseMusicName_(response);
    if (!musicName) {
      return null;
    }

    var results = [];

    for (var gameMode = 0; gameMode < NUM_GAME_MODES;
         ++gameMode) {
      for (var difficulty = 0; difficulty < NUM_DIFFICULTIES;
           ++difficulty) {
        var base = 1 + gameMode * 4 * NUM_DIFFICULTIES + difficulty;

        results.push({
            musicName: musicName,
            gameMode: gameMode,
            difficulty: difficulty,
            lamp: MusicInfoParser.parseLamp_(tds, base),
            djLevel: MusicInfoParser.parseDJLevel_(tds, base),
            score: MusicInfoParser.parseScore_(tds, base),
            missCount: MusicInfoParser.parseMissCount_(tds, base)
        });
      }
    }

    return results;
  };

  function Fetcher(statusWidget, statsWidget, resultWidget, cache, concurrency) {
    this.numPendingXHRChains_ = 0;
    this.pendingXHRs_ = {};

    this.concurrency_ = concurrency;
    this.versions_ = [];

    this.statusWidget_ = statusWidget;
    this.statsWidget_ = statsWidget;
    this.resultWidget_ = resultWidget;

    this.cache_ = cache;
  }

  Fetcher.normalizeResult_ = function(result) {
    var DEFAULT_VALUES = {
        lamp: Number.MAX_VALUE,
        djLevel: Number.MAX_VALUE,
        score: -1,
        missCount: Number.MAX_VALUE
    };
    for (var key in DEFAULT_VALUES) {
      if (result[key] == null) {
        result[key] = DEFAULT_VALUES[key];
      }
    }
  }

  function showResult(result, statsWidget, resultWidget) {
    result.star = getStar(result.musicName, result.gameMode, result.difficulty)

    if (result.star == null || result.star == 0) {
      return;
    }

    statsWidget.append(result);

    if (result.lamp == lampNameToID('NO PLAY')) {
      return;
    }

    resultWidget.append(result);
  }

  Fetcher.prototype.processMusicInfo_ = function(response) {
    var results = MusicInfoParser.parse(response);
    if (results == null) {
      return false;
    }

    for (var i in results) {
      var result = results[i];

      Fetcher.normalizeResult_(result);

      if (this.cache_) {
        this.cache_.append(result);
      }

      showResult(result, this.statsWidget_, this.resultWidget_);
    }

    return true;
  }

  Fetcher.prototype.onFetchAndProcessMusicInfoComplete_ = function(status, responseXML, index) {
    delete this.pendingXHRs_[index];

    if (status == 200 && this.processMusicInfo_(responseXML)) {
      setTimeout(this.fetchAndProcessMusicInfo_.bind(this), 0, index + this.concurrency_);
      return;
    }

    --this.numPendingXHRChains_;
    if (this.numPendingXHRChains_ > 0) {
      return;
    }

    setTimeout(this.loadNextVersion_.bind(this), 0);
  }

  Fetcher.prototype.fetchAndProcessMusicInfo_ = function(index) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/game/2dx/20/p/djdata/music_info.html?index=' + index);
    xhr.responseType = 'document';
    var fetcher = this;
    xhr.onreadystatechange = function() {
      if (this.readyState != this.DONE) {
        return;
      }

      fetcher.onFetchAndProcessMusicInfoComplete_(this.status, this.responseXML, index);
    };
    xhr.send();

    this.pendingXHRs_[index] = xhr;
  }

  Fetcher.prototype.onLoadNextVersionComplete_ = function(ok) {
    if (-1 in this.pendingXHRs_) {
      delete this.pendingXHRs_[-1];
    }
    this.pendingXHRs_ = {};

    if (!ok) {
      return;
    }

    this.numPendingXHRChains_ = 0;
    for (var index = 0; index < this.concurrency_; ++index) {
      this.fetchAndProcessMusicInfo_(index);
      ++this.numPendingXHRChains_;
    }
  }

  Fetcher.prototype.loadNextVersion_ = function() {
    var version = this.versions_.shift();
    if (version == null) {
      this.statusWidget_.clear();
      if (this.cache_) {
        this.cache_.save();

        this.statusWidget_.append(document.createTextNode('取得完了。キャッシュに取得したデータを保存しました'));
      } else {
        this.statusWidget_.append(document.createTextNode('取得完了しました'));
      }
      return;
    }

    this.statusWidget_.clear();
    this.statusWidget_.append(document.createTextNode(VERSION_NAMES[version] + 'のデータを取得中'));

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/game/2dx/20/p/djdata/music.html?list=' + version + '&s=1');
    var fetcher = this;
    xhr.onreadystatechange = function() {
      if (this.readyState != this.DONE) {
        return;
      }

      var ok = this.status == 200;
      fetcher.onLoadNextVersionComplete_(ok);
    };
    xhr.send();

    this.pendingXHRs_[-1] = xhr;
  }

  Fetcher.prototype.reset_ = function() {
    this.abort();

    this.statsWidget_.clear();
    this.resultWidget_.clear();

    this.cache_.clear();
  }

  Fetcher.prototype.loadFetchAndProcess_ = function(versions) {
    this.reset_();

    this.versions_ = versions;

    this.loadNextVersion_();
  }

  Fetcher.prototype.loadFetchAndProcessAll = function() {
    var versions = [];
    for (var i = 19; i >= 0; --i) {
      versions.push(i);
    }
    this.loadFetchAndProcess_(versions);
  }

  Fetcher.prototype.fetchAndProcess = function() {
    this.reset_();

    this.onLoadNextVersionComplete_(true);
  }

  Fetcher.prototype.abort = function() {
    for (var key in this.pendingXHRs_) {
      this.pendingXHRs_[key].abort();
    }
    this.pendingXHRs_ = {};
  }

  function Cache() {
    this.clear();
  }

  Cache.STORAGE_KEY_ = '844e2e62e9ee37621186958810c874c1';

  Cache.prototype.clear = function() {
    this.results_ = [];
  }

  Cache.prototype.append = function(result) {
    this.results_.push(result);
  }

  Cache.prototype.load = function() {
    var json = localStorage.getItem(
        Cache.STORAGE_KEY_ + window.location.toString());
    if (!json) {
      return null;
    }
    return JSON.parse(json);
  }

  Cache.prototype.save = function() {
    localStorage.setItem(
        Cache.STORAGE_KEY_ + window.location.toString(),
        JSON.stringify(this.results_));
  }

  // Namespace for globals.
  var tricoro = {};

  tricoro.statusWidget = new StatusWidget();
  tricoro.statsWidget = new StatsWidget();
  tricoro.resultWidget = new ResultWidget();

  {
    var target = document.querySelector('.Rcont_box');
    if (!target) {
      return;
    }

    target.parentNode.appendChild(tricoro.statusWidget.div());
    target.parentNode.appendChild(tricoro.statsWidget.div());
    target.parentNode.appendChild(tricoro.resultWidget.table());
  }

  tricoro.fetcher = null;

  tricoro.cache = null;
  if ('localStorage' in window && 'JSON' in window) {
    tricoro.cache = new Cache();
  }

  function update() {
    if (tricoro.fetcher == null) {
      tricoro.fetcher = new Fetcher(tricoro.statusWidget, tricoro.statsWidget, tricoro.resultWidget, tricoro.cache, 1);
    }
    if (!window.location.search) {
      tricoro.fetcher.loadFetchAndProcessAll();
    } else {
      tricoro.fetcher.fetchAndProcess();
    }
  }

  function tryCache() {
    if (!tricoro.cache) {
      return false;
    }

    var results = tricoro.cache.load();
    if (results == null) {
      return false;
    }

    if (tricoro.fetcher != null) {
      tricoro.fetcher.abort();
    }

    tricoro.statusWidget.clear();
    tricoro.statusWidget.append(document.createTextNode('キャッシュから読み込みました。'));
    var updateButton = document.createElement('a');
    updateButton.appendChild(document.createTextNode('ここをクリックすると最新データを取得'));
    updateButton.addEventListener('click', update.bind(null, 4));
    tricoro.statusWidget.append(updateButton);

    tricoro.statsWidget.clear();

    tricoro.resultWidget.clear();

    for (var i in results) {
      var result = results[i];

      showResult(result, tricoro.statsWidget, tricoro.resultWidget);
    }

    return true;
  }

  if (tryCache()) {
    return;
  }

  update();
})();
