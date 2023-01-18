import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import {
    useFeaturePostMutation,
    useUnfeaturePostMutation,
} from '@/redux/features/apiSlice'

export default ({ id, value }) => {
    const [featurePost, {}] = useFeaturePostMutation()
    const [unfeaturePost, {}] = useUnfeaturePostMutation()
    const [enabled, setEnabled] = useState(value)
	const [toggled,setToggled]=useState(false);
    const toggleEnabled = value => {
        setEnabled(value)
		setToggled(true)
    }
	useEffect(()=>{
		console.log(enabled)
		enabled && toggled ? featurePost(id) : unfeaturePost(id)
	},[enabled])

    return (
        <div>
            <span className='pb-2 block'>Featured</span>
            <Switch
                checked={enabled}
                onChange={toggleEnabled}
                className={`${
                    enabled ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 md:h-4 w-11 items-center rounded-full`}>
                <span className='sr-only'>Enable notifications</span>
                <span
                    className={`${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
            </Switch>
        </div>
    )
}
