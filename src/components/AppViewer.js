import React from 'react';
import '../components/Footer.css';
function AppViewer({appStore, googlePlay}){    
    return(
        <div style={{display:"flex","flex-direction": "row", marginTop:"20px"}}>
            {appStore !== undefined? <a target="_blank" href={appStore}><img alt={"app store link"} src={ require('../assets/appStore.png') } width={170} height={50} /></a>: undefined}
            {googlePlay !== undefined? <a target="_blank" href={googlePlay}><img alt={"google play link"} src={ require('../assets/googlePlay.png') } width={170} height={50} /></a>: undefined}
        </div>
    )
}
export default AppViewer;