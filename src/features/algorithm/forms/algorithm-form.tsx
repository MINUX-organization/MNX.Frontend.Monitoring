import { algorithmByIdQueryOptions, AlgorithmPostSchema, AlgorithmPostType, algorithmRepository } from "@/entities/algorithm";
import { minerRepository, MinerType } from "@/entities/miner";
import { CircleMinusIcon, CirclePlusIcon } from "@/shared/assets/svg";
import { UiButton, UiField, UiInput, UiSelect } from "@/shared/ui";
import { Group, IconButton, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { find, map } from "lodash";
import { useEffect } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form"

const { useAlgorithmMutation } = algorithmRepository;
const { useMinerQuery } = minerRepository;

export function AlgorithmForm({
  onClose,
  algorithmId,
} : {
  onClose?: () => void;
  algorithmId?: string
}) {
  const { data: findedAlgorithm } = useQuery(algorithmByIdQueryOptions(algorithmId));
  const { miners } = useMinerQuery();
  const { addAlgorithm, editAlgorithm } = useAlgorithmMutation();

  const { control, reset, handleSubmit, formState: { errors } } = useForm<AlgorithmPostType>({
    defaultValues: {
      fullName: '',
      bindings: [{ relativeName: '', minerId: '' }]
    },
    mode: 'onChange',
    resolver: zodResolver(AlgorithmPostSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bindings"
  });

  const onSubmit: SubmitHandler<AlgorithmPostType> = (data) => {
    if (algorithmId) {
      editAlgorithm({ id: algorithmId, ...data });
    } else {
      addAlgorithm(data);
    }
    
    onClose?.();
  };

  const handleAddBinding = () => {
    append({ relativeName: '', minerId: '' });
  };

  const handleRemoveBinding = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    if (!findedAlgorithm?.data) return
  
    reset(findedAlgorithm.data)
  }, [findedAlgorithm?.data, reset]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <UiField 
              label="Algorithm full name" 
              errorText={errors.fullName?.message?.toString()} 
              invalid={!!errors.fullName}
            >
              <UiInput {...field} placeholder="Algorithm full name"/>
            </UiField>
          )} 
        />
        <UiField label={'Bindings'} >
          <Stack>
            {map(fields, (field, index) => (
              <Group key={field.id} alignItems={'flex-start'} flexDirection={{ base: 'column', md: 'row'}}>
                <Controller
                  control={control}
                  name={`bindings.${index}.relativeName`}
                  render={({ field }) => (
                    <UiField 
                      label={`Relative name ${index + 1}`} 
                      errorText={errors.bindings?.[index]?.relativeName?.message?.toString()}
                      invalid={!!errors.bindings?.[index]?.relativeName}
                    >
                      <UiInput {...field} placeholder="Relative name" />
                    </UiField>
                  )}
                />
                <Controller 
                  control={control}
                  name={`bindings.${index}.minerId`}
                  render={({ field }) => (
                    <UiField
                      className="group peer"
                      label={`Miner ${index + 1}`}
                      errorText={errors.bindings?.[index]?.minerId?.message?.toString()}
                      invalid={!!errors.bindings?.[index]?.minerId}
                    >
                      <UiSelect<MinerType>
                        invalid={!!errors.bindings?.[index]?.minerId}
                        placeholder="Select miner"
                        items={miners ?? []}
                        getLabel={(item) => `${item.name} ${item.version}`}
                        onChange={(item) => field.onChange(item?.id)}
                        selectedItem={find(miners, { id: field.value })}
                      />
                    </UiField>
                  )}
                />
                <Group gap={0} w={'12.6rem'} mt={{ base: 0, md: '1.85rem' }}>
                  <IconButton 
                    variant="ghost" 
                    className='group' 
                    aria-label="Remove binding" 
                    onClick={() => handleRemoveBinding(index)}
                    disabled={fields.length === 1}
                  >
                    <CircleMinusIcon color={'red.500'} w={8} h={8}/>
                  </IconButton>
                  {index === fields.length - 1 && 
                    <IconButton variant="ghost" className='group' aria-label="Add binding" onClick={handleAddBinding}>
                      <CirclePlusIcon color={'minux.solid'} w={8} h={8}/>
                    </IconButton>}
                </Group>
              </Group>
            ))}
          </Stack>
        </UiField>
        <Group flex={1} mt={2}>
          <UiButton flex={1} colorPalette={'accept'} type="submit">Submit</UiButton>
          <UiButton flex={1} colorPalette={'cancel'} onClick={handleReset}>Reset</UiButton>
          <UiButton flex={1} colorPalette={'cancel'} onClick={onClose}>Cancel</UiButton>
        </Group>
      </Stack>
    </form>
  )
}