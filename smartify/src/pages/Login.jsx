import logo from '../assets/logoB.png'
import Input from '../components/Input'
import img from '../assets/login.jpg'

const Login=()=>{
    return(
    <>
      <div className='flex'>
        {/* login */}
        <div className='flex justify-center items-center w-full absolute sm:top-0 sm:left-0 md:w-1/2 lg:w-1/3'>
          <img src={logo} className='h-[2rem] w-[5rem] absolute top-0 left-[45%] sm:left-4 ml-[1.5rem] mt-[1rem]'></img>
          <div className='absolute left-[40%] right-[55%] top-[10rem] size-[20rem] sm:left-10'>
            <div className='flex flex-col text-[1.9rem] text-blue-950 sm:left-10'>
               <p>Welcome to Smartify</p>
               <p>Sign into your account</p>
            </div>
            <form className='flex flex-col gap-[1rem] mt-[2.25rem]'> 
                <Input type='text' placeholder="Phone or email address"/>
                <Input type='password' placeholder="Password"/>
                <p className='w-[9rem] h-[2.75rem] bg-blue-600 rounded-[0.63rem] text-white font-semibold text-[1.25rem] flex items-center justify-center'>Log in</p>
            </form>
            <div className='flex justify-between mt-[0.75rem]'>
               <a href='http://localhost:5173/forgot' className='cursor-pointer'>Forgot password?</a>
               <div className='flex gap-[0.25rem]'>
                  <p>New user?</p> 
                  <a href='http://localhost:5173/signup' className='cursor-pointer'>Sign up</a>
               </div>
            </div>

          </div>
        </div>

        {/* img */}
        <div className='hidden sm:flex'>
          <img src={img} className='w-[60%] h-full object-cover absolute right-0 top-0 bottom-0'></img>
        </div>
      </div>
     </>
    )
}
export default Login;


