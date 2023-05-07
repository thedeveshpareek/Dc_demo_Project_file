package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable<U>{

    @CreatedDate
    @Column(name = "CREATED_DATE", nullable = false, updatable = false)
    private Date createdDate;

    @LastModifiedDate
    @Column(name = "MODIFIED_DATE", nullable = false)
    private Date modifiedDate;

    @JsonIgnore
    @CreatedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="CREATED_BY", updatable = false)
    private U createdBy;

    @JsonIgnore
    @LastModifiedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="MODIFIED_BY")
    private U modifiedBy;
}
