import puppeteer from "puppeteer";
import fs from "fs";

// immediately invoked functional expression  
(async () => {
  const stateUrls = [
    'https://www.usapowerlifting.com/calendar/?wpv_view_count=16891&country-of-event%5B%5D=US&state-of-event%5B%5D=CA&event-level%5B%5D=&wpv-wpcf-month-of-event=&wpv_filter_submit=Search',
    'https://www.usapowerlifting.com/calendar/?wpv_view_count=16891&country-of-event%5B%5D=US&state-of-event%5B%5D=TX&event-level%5B%5D=&wpv-wpcf-month-of-event=&wpv_filter_submit=Search',
    'https://www.usapowerlifting.com/calendar/?wpv_view_count=16891&country-of-event%5B%5D=US&state-of-event%5B%5D=AZ&event-level%5B%5D=&wpv-wpcf-month-of-event=&wpv_filter_submit=Search',
    'https://www.usapowerlifting.com/calendar/?wpv_view_count=16891&country-of-event%5B%5D=US&state-of-event%5B%5D=FL&event-level%5B%5D=&wpv-wpcf-month-of-event=&wpv_filter_submit=Search'
  ]
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  const meets = []
  
  // for every state, extract the basic meet information for every meet
  for (const stateUrl of stateUrls){
    console.log(`Navigating to ${stateUrl}`)
    // let headless browser navigate to the stateUrl
    await page.goto(stateUrl)

    // extract basic meet information as an object from the page's HTML
    const basicMeetInfo = await page.evaluate(() => {
      const meetElements = Array.from(document.querySelectorAll('.vc_tta-panel'))
      return meetElements.map(meetElement => {
        const meetTitleContainer = meetElement.querySelector('.vc_tta-panel-heading').querySelector('h4').querySelector('a').querySelector('span').querySelector('.event-title-container')
        const name = meetTitleContainer.querySelector('.event-name').innerText
        const state = meetTitleContainer.querySelector('.event-state').innerText
        const date = meetTitleContainer.querySelector('.event-date').innerText

        const meetBodyContainer = meetElement.querySelector('.vc_tta-panel-body').firstElementChild.firstElementChild
        const location = meetBodyContainer.querySelector('.event-info').innerHTML.split('<br>')[2].split("Location: ")[1].trim()
        const link = meetBodyContainer.querySelector('.event-button').querySelector('a')?.href
        return { name, state, date, location, link}
      })
    })
    meets.push(...basicMeetInfo)
  }

  // check if file exists and delete if if so
  const filePath = 'server/data/meets.json'
  if (fs.existsSync(filePath)){
    fs.unlinkSync(filePath)
  }
  
  // save the data into a JSON file
  fs.writeFileSync('server/data/meets.json', JSON.stringify(meets, null, 2))

  await browser.close()
})();