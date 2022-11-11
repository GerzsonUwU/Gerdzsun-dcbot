const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const { QueryType } = require("discord-player")
const nodeHtmlToImage = require('node-html-to-image')
const { MessageAttachment } = require('discord.js')
const CoinGecko = require('coingecko-api');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("crypto")
        .setDescription("Get's crypto prices")
        .addSubcommand((subcommand) =>
            subcommand.setName("top")
            .setDescription("Get's the top crypto prices.")
        )
        .addSubcommand((subcommand) => 
            subcommand.setName("favorites")
            .setDescription("Loads a playlist of songs from a url")
        )
        .addSubcommand((subcommand) =>
            subcommand.setName("search")
            .setDescription("Get's the top crypto prices.")
            .addStringOption((option) => option.setName("cryptoname").setDescription("the search keywords").setRequired(true))
        ),
        run: async ({client, interaction}) => {
            let embed = new MessageEmbed()

            if (interaction.options.getSubcommand() === "top") {
              const CoinGeckoClient = new CoinGecko();
              let data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
                  coin_ids: ['bitcoin', 'ethereum', 'solana']
              });
              var _coinList = {};
              var _datacc = data.data.tickers.filter(t => t.target == 'USD');
              [
                  'BTC',
                  'ETH',
                  'SOL'
              ].forEach((i) => {
                  var _temp = _datacc.filter(t => t.base == i);
                  var _res = _temp.length == 0 ? [] : _temp[0];
                  _coinList[i] = _res.last;
              })

                const _htmlTemplate = `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="X-UA-Compatible" content="ie=edge"/> <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <style>body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: rgba(22, 22, 22, 0); color: #fff; max-width: 500px; height: fit-content; -webkit-font-smoothing: antialiased;}.app{max-width: 400px; height: fit-content; padding: 5px; display: flex; flex-direction: row; border-top: 5px solid rgb(16, 180, 209); background: rgba(31, 31, 31, 0); align-items: center;}.div{max-width: fit-content; background: #24252a76; margin: 5px; display: flex; flex-direction: column; align-items: center;border-radius: 10px;}.iconame{display: flex; flex-direction: row; align-content: center; align-items: center;}img{width: 44px; height: 44px; margin-right: 5px; border-radius: 50%;}p{font-size: 20px; margin: 0px;}</style> </head> <body> <div class="app"> <div class="div"> <div class="iconame"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"> <p>Bitcoin</p></div><p>${Math.round(_coinList.BTC)} USD</p></div><div class="div"> <div class="iconame"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"> <p>Etherium</p></div><p>${Math.round(_coinList.ETH)} USD</p></div><div class="div"> <div class="iconame"> <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png"> <p>Solana</p></div><p>${Math.round(_coinList.SOL)} USD</p></div></div></body>`

                const images = await nodeHtmlToImage({
                    html: _htmlTemplate,
                    type: 'png',
                    transparent: true,
                    puppeteerArgs: {
                      args: ['--no-sandbox'],
                    },
                    encoding: 'buffer',
                  })

                const cryptoimg = new MessageAttachment(images, `crypto.png`)  
                await interaction.editReply({files: [cryptoimg]})
            }
          
          if (interaction.options.getSubcommand() === "search") {
            let cryptoname = interaction.options.getString("cryptoname")

            const CoinGeckoClient = new CoinGecko();
              let data = await CoinGeckoClient.coins.fetch(cryptoname, {})

              const gif = 'https://cdn.dribbble.com/users/199982/screenshots/4156781/media/514bfe2b3d6db8c801ef885a91018ea7.gif'
              const loader = new MessageAttachment(gif, `loader.gif`)
              await interaction.editReply({files: [loader]})

              if(!data.data.error){
                const pricechange24 = data.data.market_data.price_change_percentage_24h
                const pricechange24h = String(pricechange24)
                if (pricechange24h.charAt(0) === '-'){
                  const _htmlTemplate = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/> <title>Document</title> </head> <style>body{background-color: #ffffff00; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;}p{margin: 0px;}.div{background-color: #1b1b1d; border-radius: 20px; width: 500px; height: 310px; box-shadow: 0px 16px 20px rgb(20 20 21 / 30%);}.div1{background-color: #1b1b1d; border-radius: 20px; width: 500px; position: relative; display: flex; align-items: center;}.div2{background-color: #1b1b1d; border-radius: 20px; margin-left: 20px; margin-right: 20px; position: relative;}.div4{position: absolute; left: 316px; top: 234px; display: flex; flex-direction: column; align-items: center;}.graph{width: 500px; height: 200px;}.coinico{position: absolute; left: 20px; top: 147px; width: 64px; height: 64px;}.text{color: #edf0f1;}.u{display: flex; width: 85px; height: 34px; background-color: #ea3943; border-radius: 20px; justify-content: center; align-items: center;}.price{font-size: 30px; font-weight: bold; margin-right: 40px; margin-left: 20px;}.extra{margin-top: 10px; display: flex;}.bar{background: linear-gradient(90deg,#ea3943 0%, #16c784 100%); width: 180px; height: 10px; border-radius: 100px;}.minmax{display: flex; justify-content: space-between;}</style> <body> <div class="div"> <img class="graph" src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg"> <div class="div1"> <p class="text price">${data.data.market_data.current_price.usd}USD</p><div class="u"><p class="text">${Math.round(data.data.market_data.price_change_percentage_24h * 100) / 100}%</p><span class="material-symbols-rounded text">arrow_drop_down</span></div></div><div class="extra"> <div class="div2"> <p class="text">Market Cap</p><p class="text">$${data.data.market_data.market_cap.usd}</p></div><div class="div3"> <p class="text">Circulating Supply</p><p class="text">${data.data.market_data.circulating_supply} ${data.data.symbol}</p></div><div class="div4"> <p class="text">24H range</p><div> <div class="bar"></div><div class="minmax"> <p class="text">$${data.data.market_data.low_24h.usd}</p><p class="text">$${data.data.market_data.high_24h.usd}</p></div></div></div></div><img class="coinico" src="${data.data.image.large}"> </div></body> </html>`
                  const images = await nodeHtmlToImage({
                    html: _htmlTemplate,
                    type: 'png',
                    transparent: true,
                    puppeteerArgs: {
                      args: ['--no-sandbox'],
                    },
                    encoding: 'buffer',
                  })
    
                  if(!data.data.links.subreddit_url && !data.data.links.repos_url.github[0]){
                    const cryptoimg = new MessageAttachment(images, `crypto.png`) 
                    await interaction.editReply({files: [cryptoimg]})
                  }else if(!data.data.links.subreddit_url){
                    const row = new MessageActionRow()
                    .addComponents(
                      new MessageButton()
                        .setLabel('GitHub')
                        .setStyle('LINK')
                        .setURL(`${data.data.links.repos_url.github[0]}`)
                    )
                    
                    const cryptoimg = new MessageAttachment(images, `crypto.png`) 
                    await interaction.editReply({files: [cryptoimg], components: [row]})
                  }else if(!data.data.links.repos_url.github[0]){
                    const row = new MessageActionRow()
                      .addComponents(
                        new MessageButton()
                          .setLabel('Reddit')
                          .setStyle('LINK')
                          .setURL(`${data.data.links.subreddit_url}`)
                      )

                      const cryptoimg = new MessageAttachment(images, `crypto.png`) 
                      await interaction.editReply({files: [cryptoimg], components: [row]})
                  }else{
                    const row = new MessageActionRow()
                    .addComponents(
                      new MessageButton()
                        .setLabel('GitHub')
                        .setStyle('LINK')
                        .setURL(`${data.data.links.repos_url.github[0]}`)
                    )
                    .addComponents(
                      new MessageButton()
                        .setLabel('Reddit')
                        .setStyle('LINK')
                        .setURL(`${data.data.links.subreddit_url}`)
                    )

                    const cryptoimg = new MessageAttachment(images, `crypto.png`) 
                    await interaction.editReply({files: [cryptoimg], components: [row]})
                  }

                } else{
                  const _htmlTemplate = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/> <title>Document</title> </head> <style>body{background-color: #ffffff00; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;}p{margin: 0px;}.div{background-color: #1b1b1d; border-radius: 20px; width: 500px; height: 310px; box-shadow: 0px 16px 20px rgb(20 20 21 / 30%);}.div1{background-color: #1b1b1d; border-radius: 20px; width: 500px; position: relative; display: flex; align-items: center;}.div2{background-color: #1b1b1d; border-radius: 20px; margin-left: 20px; margin-right: 20px; position: relative;}.div4{position: absolute; left: 316px; top: 234px; display: flex; flex-direction: column; align-items: center;}.graph{width: 500px; height: 200px;}.coinico{position: absolute; left: 20px; top: 147px; width: 64px; height: 64px;}.text{color: #edf0f1;}.u{display: flex; width: 85px; height: 34px; background-color: #16c784; border-radius: 20px; justify-content: center; align-items: center;}.price{font-size: 30px; font-weight: bold; margin-right: 40px; margin-left: 20px;}.extra{margin-top: 10px; display: flex;}.bar{background: linear-gradient(90deg,#ea3943 0%, #16c784 100%); width: 180px; height: 10px; border-radius: 100px;}.minmax{display: flex; justify-content: space-between;}</style> <body> <div class="div"> <img class="graph" src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg"> <div class="div1"> <p class="text price">${data.data.market_data.current_price.usd}USD</p><div class="u"><p class="text">${Math.round(data.data.market_data.price_change_percentage_24h * 100) / 100}%</p><span class="material-symbols-rounded text">arrow_drop_up</span></div></div><div class="extra"> <div class="div2"> <p class="text">Market Cap</p><p class="text">$${data.data.market_data.market_cap.usd}</p></div><div class="div3"> <p class="text">Circulating Supply</p><p class="text">${data.data.market_data.circulating_supply} ${data.data.symbol}</p></div><div class="div4"> <p class="text">24H range</p><div> <div class="bar"></div><div class="minmax"> <p class="text">$${data.data.market_data.low_24h.usd}</p><p class="text">$${data.data.market_data.high_24h.usd}</p></div></div></div></div><img class="coinico" src="${data.data.image.large}"> </div></body> </html>`
                  const images = await nodeHtmlToImage({
                    html: _htmlTemplate,
                    type: 'png',
                    transparent: true,
                    puppeteerArgs: {
                      args: ['--no-sandbox'],
                    },
                    encoding: 'buffer',
                  })

                  if(!data.data.links.subreddit_url && !data.data.links.repos_url.github[0]){
                    const cryptoimg = new MessageAttachment(images, `crypto.png`) 
                    await interaction.editReply({files: [cryptoimg]})
                  }else if(!data.data.links.subreddit_url){
                    const row = new MessageActionRow()
                    .addComponents(
                      new MessageButton()
                        .setLabel('GitHub')
                        .setStyle('LINK')
                        .setURL(`${data.data.links.repos_url.github[0]}`)
                    )
                    
                    const cryptoimg = new MessageAttachment(images, `crypto.png`) 
                    await interaction.editReply({files: [cryptoimg], components: [row]})
                  }else if(!data.data.links.repos_url.github[0]){
                    const row = new MessageActionRow()
                      .addComponents(
                        new MessageButton()
                          .setLabel('Reddit')
                          .setStyle('LINK')
                          .setURL(`${data.data.links.subreddit_url}`)
                      )

                      const cryptoimg = new MessageAttachment(images, `crypto.png`) 
                      await interaction.editReply({files: [cryptoimg], components: [row]})
                  }else{
                    const row = new MessageActionRow()
                    .addComponents(
                      new MessageButton()
                        .setLabel('GitHub')
                        .setStyle('LINK')
                        .setURL(`${data.data.links.repos_url.github[0]}`)
                    )
                    .addComponents(
                      new MessageButton()
                        .setLabel('Reddit')
                        .setStyle('LINK')
                        .setURL(`${data.data.links.subreddit_url}`)
                    )

                    const cryptoimg = new MessageAttachment(images, `crypto.png`) 
                    await interaction.editReply({files: [cryptoimg], components: [row]})
                  }
                }
              }else{
                interaction.editReply("No coin was found with the entered id!")
              }
              

          }

          if (interaction.options.getSubcommand() === "favorites"){
            const CoinGeckoClient = new CoinGecko();
            let data = await CoinGeckoClient.coins.fetch({
              // coin_ids: ['ethereum', 'solana', 'shiba-inu', 'binancecoin']
            }, {})

            console.log(data);
          }
        },
}