import { Skeleton } from 'primereact/skeleton'
import React from 'react'

const SkeletonCard = ({ count }) => {
    return (
        Array(count).fill(0).map((_, index) => (
            <div className="skeleton-card card" key={index}>
                <Skeleton width="100%" height="300px"></Skeleton>
                <Skeleton width="100%" height="20px"></Skeleton>
                <Skeleton width="60%" height="20px"></Skeleton>
                <Skeleton width="20%" height="20px"></Skeleton>
            </div>
        ))
    )
}

export default SkeletonCard