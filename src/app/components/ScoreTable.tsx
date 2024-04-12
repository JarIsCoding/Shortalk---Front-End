import React from 'react'

const ScoreTable = () => {
    return (
        <div className='flex justify-center'>
            <table>
                <tr className='font-LuckiestGuy text-[48px] tracking-widest'>
                    <th className='text-red-600'>-1 POINT</th>
                    <th className='text-green-600'>+1 POINT</th>
                    <th className='text-purple-600'>+3 POINT</th>
                </tr>
                <tr>
                    <td>
                        <div className='grid grid-cols-2'>
                            <div className=''>word</div>
                            <div>bigword</div>
                        </div>
                    </td>
                    <td>
                        <div className='grid grid-cols-2'>
                            <div className=''>word</div>
                            <div>bigword</div>
                        </div>
                    </td>
                    <td>
                        <div className='grid grid-cols-2'>
                            <div className=''>word</div>
                            <div>bigword</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className='grid grid-cols-2'>
                            <div className=''>word</div>
                            <div>bigword</div>
                        </div>
                    </td>
                    <td>
                        <div className='grid grid-cols-2'>
                            <div className=''>word</div>
                            <div>bigword</div>
                        </div>
                    </td>
                    <td>
                        <div className='grid grid-cols-2'>
                            <div className=''>word</div>
                            <div>bigword</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className='grid grid-cols-2'>
                            <div className=''>word</div>
                            <div>bigword</div>
                        </div>
                    </td>
                    <td>
                        <div className='grid grid-cols-2'>
                            <div className=''>word</div>
                            <div>bigword</div>
                        </div>
                    </td>
                    <td>
                        <div className='grid grid-cols-2'>
                            <div className=''>word</div>
                            <div>bigword</div>
                        </div>
                    </td>
                </tr>

            </table>
        </div>
    )
}

export default ScoreTable
