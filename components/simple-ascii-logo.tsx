"use client"

export function SimpleAsciiLogo() {
  return (
    <pre className="font-mono text-white text-sm sm:text-lg md:text-2xl lg:text-3xl whitespace-pre bg-black p-4 overflow-x-auto">
      {`
   ######    #######   ##    ##  ##     ##  ##       
  ##    ##  ##     ##  ##   ##   ##     ##  ##       
  ##        ##     ##  ##  ##    ##     ##  ##       
  ##   #### ##     ##  #####     ##     ##  ##       
  ##    ##  ##     ##  ##  ##    ##     ##  ##       
  ##    ##  ##     ##  ##   ##   ##     ##  ##       
   ######    #######   ##    ##   #######   ########
                                                    
   ######     ###    ######## ##    ##    ###       
  ##    ##   ## ##      ##     ##  ##    ## ##      
  ##        ##   ##     ##      ####    ##   ##     
   ######  ##     ##    ##       ##    ##     ##    
        ## #########    ##       ##    #########    
  ##    ## ##     ##    ##       ##    ##     ##    
   ######  ##     ##    ##       ##    ##     ##    
`}
    </pre>
  )
}