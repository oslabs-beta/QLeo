import React from 'react';

const executeMacDownload = () => {
    console.log('mac download button clicked')
}
const executeWindowsDownload = () => {
    console.log('windows download button clicked')
}


function FrontPage() {
    return(
        // <div className='download-btn'>
        //     <Button onClick={executeDownload}>Download with Mac</Button>
        //     <Button onClick={executeDownload}>Download with Windows</Button>
        // </div>
        <div>
            <button onClick={executeMacDownload}>Donwload w Mac</button>
            <button onClick={executeWindowsDownload}>Donwload w Windows</button>
        </div>

    )
}

export default FrontPage;