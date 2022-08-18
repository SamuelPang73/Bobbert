export const stripe_api_origin = "https://api.stripe.com/v1/" ;

export const ipfs_origin = 'https://ipfs.infura.io/ipfs/';
// export const ipfs_origin = 'https://solsapp.infura-ipfs.io/ipfs/' ;

export const ipfs_auth =   "Basic " + btoa(process.env.REACT_APP_IPFS_INFURA_ID + ":" + process.env.REACT_APP_IPFS_INFURA_SECRECT);