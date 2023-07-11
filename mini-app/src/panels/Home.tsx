import React, { MouseEventHandler, useState } from 'react';
import PropTypes from 'prop-types';
import {clsx} from 'clsx';
import axios from 'axios';
import './Home.css'
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
	id: string;
	go: MouseEventHandler<HTMLElement>;
	fetchedUser?: UserInfo;
}
interface Inputs  {
	example: string,
	exampleRequired: string,
	name:string,
	text:string,
	price:string
};



const Home: React.FC<Props> = ({ id, go, fetchedUser }) => {

	async function fetchApi() {
		const dataApi = await axios.get('https://63c682584ebaa802854750c5.mockapi.io/test1')
		console.log('123',data)
		return dataApi.data
	}

	async function createApi(data:any) {
		const dataZ = await axios.post('https://63c682584ebaa802854750c5.mockapi.io/test1',
		data)
		console.log('66',dataZ)
		
	}

	const data:any = useQuery('api',fetchApi)
	console.log('222',data)
	
	
	const queryClient = useQueryClient()

	const mutation = useMutation((newProduct)=>createApi(newProduct),
	{onSuccess:()=>queryClient.invalidateQueries(['api'])}
	)

	// hooks forms

	const {reset, register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
		mode: 'onChange'
	});

    const onSubmit: SubmitHandler<Inputs> = (data:any) => {
		console.log(data);
		mutation.mutate(data)
		reset()
		
	}
	console.log(errors)



	return(
	<Panel id={id}>
		<Group>
			{/* <div className={clsx('sss',kek&&'sss1')}>хех</div>
			<button onClick={()=>setKek(prev=>!prev)}>жжж</button> */}
			<div>{data.data !== undefined  &&
			data.data.map((item:any)=>{
				return(
				<div key={item.id}>{item.name}</div>)
			})}</div>
			{errors?.text && <div className='red'>{errors.text.message}</div>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='text'  {...register('name', {})} />
				<input type='text' placeholder='text' {...register('text', {required:'введите инпут'})} />
				<input  type='text' placeholder='price'  {...register('price', {})} />
				<button>Отправить</button> 
			</form>
			
		</Group>	 
	</Panel>
	)
};

export default Home;